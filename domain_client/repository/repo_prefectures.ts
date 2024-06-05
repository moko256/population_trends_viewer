import type { Prefectures } from "~/domain_common/entity/prefecture";

export abstract class PrefecturesRepo {
  static readonly Key = Symbol();
  abstract getPrefectures(): Promise<Prefectures>;
}
