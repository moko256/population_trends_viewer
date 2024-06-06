import { PopulationsRepo } from "../repo_populations";
import type { PopulationCompositions } from "~/domain_common/entity/population";
import type { PrefectureCode } from "~/domain_common/entity/prefecture";

export class ImplPopulationsRepo extends PopulationsRepo {
  async getPopulationsByPrefecture(
    prefectures: PrefectureCode[],
  ): Promise<PopulationCompositions> {
    return await $fetch<PopulationCompositions>("/api/population_composition", {
      query: { prefCodes: prefectures.join(",") },
    });
  }
}
