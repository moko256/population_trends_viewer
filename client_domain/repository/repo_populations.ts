import type { PopulationCompositions } from "~/common_domain/entity/population";
import type { PrefectureCode } from "~/common_domain/entity/prefecture";

export abstract class PopulationsRepo {
  static readonly Key = Symbol();

  abstract getPopulationsByPrefecture(
    prefectures: PrefectureCode[],
  ): Promise<PopulationCompositions>;
}
