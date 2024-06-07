import { describe, expect, it } from "vitest";

import { setActivePinia, createPinia } from "pinia";
import { createApp } from "vue";
import type { Prefectures } from "~/domain_common/entity/prefecture";
import type { PopulationCompositions } from "~/domain_common/entity/population";
import { PopulationsRepo } from "~/domain_client/repository/repo_populations";
import { PrefecturesRepo } from "~/domain_client/repository/repo_prefectures";
import { useAppState } from "./app_state";

describe("app_state", () => {
  it("`loadPrefectures()` with successful", async () => {
    activatePiniaWithRepo(
      new NormalPrefecturesRepo(),
      new NormalPopulationsRepo(),
    );

    const state = useAppState();

    // Before
    expect(false).toStrictEqual(state.isPrefecturesLoading);
    expect(false).toStrictEqual(state.isPrefecturesError);

    // Do
    await state.loadPrefectures();

    // After
    expect(false).toStrictEqual(state.isPrefecturesLoading);
    expect(false).toStrictEqual(state.isPrefecturesError);

    expect(testPrefectures).toStrictEqual(state.prefectures);
  });

  it("`selectPrefecture()` with successful", async () => {
    activatePiniaWithRepo(
      new NormalPrefecturesRepo(),
      new NormalPopulationsRepo(),
    );

    const state = useAppState();
    await state.loadPrefectures();

    // Before
    expect(false).toStrictEqual(state.isPopulationsLoading);
    expect(false).toStrictEqual(state.isPopulationsError);
    expect(false).toStrictEqual(state.canPopulationLoadWithSelections);

    // Do
    // This function loads populations automatically.
    await state.selectPrefecture(testPrefectures[0].code, true);

    // After
    expect(false).toStrictEqual(state.isPopulationsLoading);
    expect(false).toStrictEqual(state.isPopulationsError);
    expect(true).toStrictEqual(state.canPopulationLoadWithSelections);

    expect(testPopulations).toStrictEqual(state.populations);
  });

  it("`loadPrefectures()` with failure", async () => {
    activatePiniaWithRepo(
      new AlwaysFailPrefecturesRepo(),
      new NormalPopulationsRepo(),
    );

    const state = useAppState();

    // Do
    await state.loadPrefectures();

    // After
    expect([]).toStrictEqual(state.prefectures);
    expect(true).toStrictEqual(state.isPrefecturesError);
    expect(false).toStrictEqual(state.isPopulationsLoading);
  });

  it("`selectPrefecture()` with failure", async () => {
    activatePiniaWithRepo(
      new NormalPrefecturesRepo(),
      new AlwaysFailPopulationsRepo(),
    );

    const state = useAppState();
    await state.loadPrefectures();

    // Do
    await state.selectPrefecture(testPrefectures[0].code, true);

    // After
    expect([]).toStrictEqual(state.populations);
    expect(true).toStrictEqual(state.isPopulationsError);
    expect(false).toStrictEqual(state.isPopulationsLoading);
    expect(true).toStrictEqual(state.canPopulationLoadWithSelections);
  });

  it("`loadPopulations()` with no selection", async () => {
    activatePiniaWithRepo(
      new NormalPrefecturesRepo(),
      new AlwaysFailPopulationsRepo(),
    );

    const state = useAppState();
    await state.loadPrefectures();

    // Before
    expect([]).toStrictEqual(state.populations);
    expect(false).toStrictEqual(state.isPopulationsError);
    expect(false).toStrictEqual(state.isPopulationsLoading);
    expect(false).toStrictEqual(state.canPopulationLoadWithSelections);

    // Do
    await state.loadPopulations();

    // After
    expect([]).toStrictEqual(state.populations);
    expect(false).toStrictEqual(state.isPopulationsError);
    expect(false).toStrictEqual(state.isPopulationsLoading);
    expect(false).toStrictEqual(state.canPopulationLoadWithSelections);
  });
});

// Test utilities

function activatePiniaWithRepo(
  prefecturesRepo: PrefecturesRepo,
  populationsRepo: PopulationsRepo,
) {
  const app = createApp({})
    .provide(PrefecturesRepo.Key, prefecturesRepo)
    .provide(PopulationsRepo.Key, populationsRepo);

  const pinia = createPinia();
  app.use(pinia);
  setActivePinia(pinia);
}

const testPrefectures: Prefectures = [{ name: "prefecture", code: 100 }];
const testPopulations: PopulationCompositions = [
  { label: "populations", data: [] },
];

// Mock repositories

class NormalPrefecturesRepo extends PrefecturesRepo {
  async getPrefectures(): Promise<Prefectures> {
    return testPrefectures;
  }
}

class NormalPopulationsRepo extends PopulationsRepo {
  async getPopulationsByPrefecture(
    _prefectures: number[],
  ): Promise<PopulationCompositions> {
    return testPopulations;
  }
}

class AlwaysFailPrefecturesRepo extends PrefecturesRepo {
  getPrefectures(): Promise<Prefectures> {
    throw new ErrorExpected();
  }
}

class AlwaysFailPopulationsRepo extends PopulationsRepo {
  getPopulationsByPrefecture(
    _prefectures: number[],
  ): Promise<PopulationCompositions> {
    throw new ErrorExpected();
  }
}

// Error for test

class ErrorExpected extends Error {
  constructor() {
    super("Intentional error for testing.");
  }
}
