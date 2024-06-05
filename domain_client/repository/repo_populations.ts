import type { PopulationCompositions } from "~/domain_common/entity/population";
import type { PrefectureCode } from "~/domain_common/entity/prefecture";

export abstract class PopulationsRepo {
  static readonly Key = Symbol();

  abstract getPopulationsByPrefecture(
    prefectures: PrefectureCode[],
  ): Promise<PopulationCompositions>;
}
