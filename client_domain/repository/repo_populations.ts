export abstract class PopulationsRepo {
  static readonly Key = Symbol();

  abstract getPopulationsByPrefecture(
    prefectures: PrefectureCode[],
  ): Promise<PopulationCompositions>;
}
