import { PrefecturesRepo } from "../repo_prefectures";
import type { Prefectures } from "~/domain_common/entity/prefecture";

export class ImplPrefecturesRepo extends PrefecturesRepo {
  async getPrefectures(): Promise<Prefectures> {
    return await $fetch<Prefectures>("/api/prefecture");
  }
}
