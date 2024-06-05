export abstract class PrefecturesRepo {
  static readonly Key = Symbol();
  abstract getPrefectures(): Promise<Prefectures>;
}
