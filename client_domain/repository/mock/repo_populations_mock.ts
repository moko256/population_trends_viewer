import { wait } from "~/client_domain/util/wait";
import { PopulationsRepo } from "../repo_populations";
import type { PopulationCompositions } from "~/common_domain/entity/population";
import type { PrefectureCode } from "~/common_domain/entity/prefecture";

export class MockPopulationsRepo extends PopulationsRepo {
  async getPopulationsByPrefecture(
    prefectures: PrefectureCode[],
  ): Promise<PopulationCompositions> {
    await wait(2);
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
    ];
  }
}
