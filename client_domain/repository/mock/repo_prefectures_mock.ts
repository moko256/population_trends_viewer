import { wait } from "~/client_domain/util/wait";
import { PrefecturesRepo } from "../repo_prefectures";

export class MockPrefecturesRepo extends PrefecturesRepo {
  async getPrefectures(): Promise<Prefectures> {
    await wait(2);
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
