import { wait } from "~/domain_client/util/wait";
import { PopulationsRepo } from "../repo_populations";
import type { PopulationCompositions } from "~/domain_common/entity/population";
import type { PrefectureCode } from "~/domain_common/entity/prefecture";

export class MockPopulationsRepo extends PopulationsRepo {
  async getPopulationsByPrefecture(
    prefectures: PrefectureCode[],
  ): Promise<PopulationCompositions> {
    await wait(0.3);
    return [
      {
        label: `総人口 (${JSON.stringify(prefectures)})`,
        data: [
          {
            year: 1990,
            value: 9000,
          },
          {
            year: 2000,
            value: 10000,
          },
          {
            year: 2010,
            value: 9000,
          },
          {
            year: 2020,
            value: 8000,
          },
        ],
      },
      {
        label: `総人口2`,
        data: [
          {
            year: 1990,
            value: 3000,
          },
          {
            year: 2010,
            value: 5000,
          },
          {
            year: 2020,
            value: 8000,
          },
        ],
      },
    ];
  }
}
