import type {
  Prefecture,
  Prefectures,
} from "~/domain_common/entity/prefecture";
import { longCacheHeader } from "../long_cache";
import { resasHeaders, resasUrl } from "../resas_client";

// Returns `Prefectures`
export default defineEventHandler(async (event) => {
  const { resasApiKey } = useRuntimeConfig(event);

  const result = await $fetch<ResasPrefectures>(
    resasUrl("api/v1/prefectures"),
    {
      headers: resasHeaders(resasApiKey),
    },
  );

  const prefectures: Prefectures = result.result.map<Prefecture>((value) => {
    return { name: value.prefName, code: value.prefCode };
  });

  appendResponseHeaders(event, longCacheHeader());
  return prefectures;
});

type ResasPrefectures = {
  message: string;
  result: {
    prefCode: number;
    prefName: string;
  }[];
};
