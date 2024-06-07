import { wait } from "~/domain_client/util/wait";
import { PrefecturesRepo } from "../repo_prefectures";
import type { Prefectures } from "~/domain_common/entity/prefecture";

export class MockPrefecturesRepo extends PrefecturesRepo {
  delaySec: number;
  shouldFail: boolean;

  constructor(delaySec: number, shouldFail: boolean) {
    super();
    this.delaySec = delaySec;
    this.shouldFail = shouldFail;
  }

  async getPrefectures(): Promise<Prefectures> {
    await wait(this.delaySec);
    if (this.shouldFail) {
      throw new Error("Mock should fail");
    }

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
