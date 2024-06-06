import { wait } from "~/domain_client/util/wait";
import { PrefecturesRepo } from "../repo_prefectures";
import type { Prefectures } from "~/domain_common/entity/prefecture";

export class MockPrefecturesRepo extends PrefecturesRepo {
  async getPrefectures(): Promise<Prefectures> {
    await wait(0.3);
    return [
      {
        name: "A県",
        code: 1,
      },
      {
        name: "B県",
        code: 2,
      },
    ];
  }
}
