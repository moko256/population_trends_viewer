import type { Prefectures } from "~/common_domain/entity/prefecture";

export abstract class PrefecturesRepo {
  static readonly Key = Symbol();
  abstract getPrefectures(): Promise<Prefectures>;
}
