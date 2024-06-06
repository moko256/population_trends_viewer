<template>
  <div id="container">
    <!-- Prefectures -->
    <div id="prefectures-container">
      <ul id="prefecture-grid-parent" class="prefectures-container-child">
        <li
          v-for="{ name, code } in prefectures"
          :key="name"
          :aria-busy="isPrefecturesLoading"
          aria-describedby="prefectures-loading"
          class="prefecture-grid-child"
        >
          <input
            type="checkbox"
            :value="name"
            :checked="isPrefectureSelected[code] == true"
            @change="onPrefectureCheck(code, $event)"
          />
          <label :for="name">{{ name }}</label>
        </li>
      </ul>

      <div v-if="isPrefecturesLoading" class="prefectures-container-child">
        <LoadingParts progress-id="prefectures-loading" />
      </div>

      <div v-if="isPrefecturesError" class="prefectures-container-child">
        <ErrorParts
          error-message="Error when loading prefectures."
          @retry="loadPrefectures"
        />
      </div>
    </div>

    <div class="horizontal-divider"></div>

    <!-- Populations -->
    <div id="populations-container">
      <div v-if="canPopulationShow">
        <div
          id="graph-container"
          class="populations-container-child"
          :aria-busy="isPopulationsLoading"
          aria-describedby="population-loading"
        >
          <PopulationsGraph :populations="populations" />
        </div>

        <div v-if="isPopulationsLoading" class="populations-container-child">
          <LoadingParts progress-id="population-loading" />
        </div>

        <div v-if="isPopulationsError" class="populations-container-child">
          <ErrorParts
            error-message="Error when loading populations."
            @retry="loadPopulations"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PrefectureCode } from "~/domain_common/entity/prefecture";
import { useAppState } from "~/store/app_state";

const store = useAppState();

const {
  prefectures,
  isPrefecturesLoading,
  isPrefecturesError,
  isPrefectureSelected,
  populations,
  canPopulationShow,
  isPopulationsLoading,
  isPopulationsError,
} = storeToRefs(store);

const { loadPrefectures, loadPopulations, selectPrefecture } = store;

onMounted(() => {
  loadPrefectures();
});

function onPrefectureCheck(code: PrefectureCode, event: Event) {
  const checked = (event.target as HTMLInputElement).checked;
  selectPrefecture(code, checked);
}
</script>

<style>
#container {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

@media (orientation: landscape) {
  #container {
    flex-direction: row;
  }
}

#prefectures-container {
  position: relative;
  flex: 1;
}

.prefectures-container-child {
  position: absolute;
  width: 100%;
  height: 100%;
}

#populations-container {
  display: flex;
  position: relative;
  flex: 1;
}

.populations-container-child {
  position: absolute;
  width: 100%;
  height: 100%;
}

#graph-container {
  display: flex;
  padding: 8px 8px 0px 8px;
}

.horizontal-divider {
  flex-basis: 2px;
  background-color: gray;
}

#prefecture-grid-parent {
  columns: 100px auto;
  overflow-y: scroll;
}

.prefecture-grid-child {
  list-style: none;
  padding: 4px;
}
</style>
