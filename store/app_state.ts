import { defineStore } from "pinia";
import { PopulationsRepo } from "~/domain_client/repository/repo_populations";
import { PrefecturesRepo } from "~/domain_client/repository/repo_prefectures";
import type { PopulationCompositions } from "~/domain_common/entity/population";
import type {
  PrefectureCode,
  Prefectures,
} from "~/domain_common/entity/prefecture";

export const useAppState = defineStore("counter", () => {
  const prefecturesRepo = inject<PrefecturesRepo>(PrefecturesRepo.Key)!;
  const populationsRepo = inject<PopulationsRepo>(PopulationsRepo.Key)!;

  const prefectures = ref<Prefectures>([]);
  const isPrefecturesLoading = ref(true);
  const isPrefecturesError = ref(false);

  const isPrefectureSelected = ref<Record<PrefectureCode, boolean>>({});
  const selectedPrefectureCodes = computed(() =>
    prefectures.value
      .filter((v) => isPrefectureSelected.value[v.code] == true)
      .map((v) => v.code),
  );

  const populations = ref<PopulationCompositions>([]);
  const isPopulationsLoading = ref(true);
  const isPopulationsError = ref(false);

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

  async function loadPopulations() {
    isPopulationsLoading.value = true;
    isPopulationsError.value = false;

    try {
      populations.value = await populationsRepo.getPopulationsByPrefecture(
        selectedPrefectureCodes.value,
      );
    } catch (e) {
      console.log(e);
      isPopulationsError.value = true;
    }

    isPopulationsLoading.value = false;
  }

  function selectPrefecture(prefCode: PrefectureCode, selected: boolean) {
    isPrefectureSelected.value[prefCode] = selected;

    loadPopulations();
  }

  return {
    prefectures,
    isPrefecturesLoading,
    isPrefecturesError,
    isPrefectureSelected,
    selectedPrefectureCodes,
    populations,
    isPopulationsLoading,
    isPopulationsError,
    loadPrefectures,
    loadPopulations,
    selectPrefecture,
  };
});
