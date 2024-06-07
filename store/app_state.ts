import { defineStore } from "pinia";
import { PopulationsRepo } from "~/domain_client/repository/repo_populations";
import { PrefecturesRepo } from "~/domain_client/repository/repo_prefectures";
import type { PopulationCompositions } from "~/domain_common/entity/population";
import type {
  PrefectureCode,
  Prefectures,
} from "~/domain_common/entity/prefecture";

export const useAppState = defineStore("counter", () => {
  // Repositories
  const prefecturesRepo = inject<PrefecturesRepo>(PrefecturesRepo.Key)!;
  const populationsRepo = inject<PopulationsRepo>(PopulationsRepo.Key)!;

  // Prefectures
  const prefectures = ref<Prefectures>([]);
  const isPrefecturesLoading = ref(false);
  const isPrefecturesError = ref(false);

  const isPrefectureSelected = ref<Record<PrefectureCode, boolean>>({});
  const selectedPrefectureCodes = computed(() =>
    prefectures.value
      .filter((v) => isPrefectureSelected.value[v.code] == true)
      .map((v) => v.code),
  );

  // Populations
  const populations = ref<PopulationCompositions>([]);
  const canPopulationLoadWithSelections = ref(false);
  const isPopulationsLoading = ref(false);
  const isPopulationsError = ref(false);

  // Load prefectures.
  async function loadPrefectures() {
    isPrefecturesLoading.value = true;
    isPrefecturesError.value = false;
    isPrefectureSelected.value = {};

    try {
      prefectures.value = await prefecturesRepo.getPrefectures();
    } catch (e) {
      console.log(e);
      isPrefecturesError.value = true;
    }

    isPrefecturesLoading.value = false;
  }

  // Load populations.
  async function loadPopulations() {
    isPopulationsLoading.value = true;
    isPopulationsError.value = false;

    // Load populations if the number of selected prefecture is in [1, 11].
    // It is a restriction from API.
    if (
      1 <= selectedPrefectureCodes.value.length &&
      selectedPrefectureCodes.value.length <= 11
    ) {
      canPopulationLoadWithSelections.value = true;

      try {
        populations.value = await populationsRepo.getPopulationsByPrefecture(
          selectedPrefectureCodes.value,
        );
      } catch (e) {
        console.log(e);
        isPopulationsError.value = true;
      }
    } else {
      canPopulationLoadWithSelections.value = false;
      populations.value = [];
    }

    isPopulationsLoading.value = false;
  }

  // Select prefecture.
  // The populations will load automatically.
  async function selectPrefecture(prefCode: PrefectureCode, selected: boolean) {
    isPrefectureSelected.value[prefCode] = selected;

    await loadPopulations();
  }

  return {
    prefectures,
    isPrefecturesLoading,
    isPrefecturesError,
    isPrefectureSelected,
    selectedPrefectureCodes,
    populations,
    canPopulationLoadWithSelections,
    isPopulationsLoading,
    isPopulationsError,
    loadPrefectures,
    loadPopulations,
    selectPrefecture,
  };
});
