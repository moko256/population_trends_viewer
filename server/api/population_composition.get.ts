import { z } from "zod";
import { longCacheHeader } from "../long_cache";
import { resasHeaders, resasUrl } from "../resas_client";
import type {
  PopulationCompositions,
  PopulationCompositionData,
  PopulationValue,
} from "~/common_domain/entity/population";

// Query: prefCode (number)
// Returns `PopulationCompositions`.
export default defineEventHandler(async (event) => {
  const { resasApiKey } = useRuntimeConfig(event);

  const query = await getValidatedQuery(event, querySchema.parse);

  const firstPref = query.prefCodes[0];
  const restPref = query.prefCodes.slice(1);

  const result = await $fetch<ResasPopulationComposition>(
    resasUrl("api/v1/population/composition/perYear"),
    {
      headers: resasHeaders(resasApiKey),
      query: {
        // For example: 1,2,3
        //
        // prefCode: 1
        // cityCode: "-" (all cities)
        // addArea: "2_,3_" (all cities)

        prefCode: firstPref,
        cityCode: "-",
        addArea: restPref.map((v) => `${v}_`).join(","),
      },
    },
  );

  const composition: PopulationCompositions =
    result.result.data.map<PopulationCompositionData>((value) => {
      return {
        label: value.label,
        data: value.data
          // Include only <=2020 (boundaryYear)
          .filter((v) => v.year <= result.result.boundaryYear)
          .map<PopulationValue>((item) => {
            return {
              year: item.year,
              value: item.value,
            };
          }),
      };
    });

  appendResponseHeaders(event, longCacheHeader());
  return composition;
});

const querySchema = z.object({
  prefCodes: z
    .string()
    .min(1)
    .transform((v) => v.split(","))
    .pipe(z.array(z.coerce.number()).min(1)),
});

type ResasPopulationComposition = {
  message: string;
  result: {
    boundaryYear: number;
    data: {
      label: string;
      data: {
        year: number;
        value: number;
        rate: number | undefined;
      }[];
    }[];
  };
};
