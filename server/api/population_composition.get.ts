import { z } from "zod";
import { longCacheHeader } from "../long_cache";
import { resasHeaders, resasUrl } from "../resas_client";

// Query: prefCode (number)
// Returns `PopulationCompositions`.
export default defineEventHandler(async (event) => {
  const { resasApiKey } = useRuntimeConfig(event);

  const query = await getValidatedQuery(event, querySchema.parse);

  const result = await $fetch<ResasPopulationComposition>(
    resasUrl("api/v1/population/composition/perYear"),
    {
      headers: resasHeaders(resasApiKey),
      query: {
        prefCode: query.prefCode,
        cityCode: "-",
      },
    },
  );

  const composition: PopulationCompositions =
    result.result.data.map<PopulationCompositionData>((value) => {
      return {
        label: value.label,
        data: value.data.map<PopulationValue>((item) => {
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
  prefCode: z.coerce.number(),
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
