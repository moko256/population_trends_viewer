import { ImplPopulationsRepo } from "./impl/repo_populations_impl";
import { ImplPrefecturesRepo } from "./impl/repo_prefectures_impl";
import { MockPopulationsRepo } from "./mock/repo_populations_mock";
import { MockPrefecturesRepo } from "./mock/repo_prefectures_mock";
import { PopulationsRepo } from "./repo_populations";
import { PrefecturesRepo } from "./repo_prefectures";

export function provideRepo(useMock: boolean) {
  if (useMock) {
    console.log("Loading mock repositories...");
    provide(PrefecturesRepo.Key, new MockPrefecturesRepo());
    provide(PopulationsRepo.Key, new MockPopulationsRepo());
  } else {
    provide(PrefecturesRepo.Key, new ImplPrefecturesRepo());
    provide(PopulationsRepo.Key, new ImplPopulationsRepo());
  }
}
