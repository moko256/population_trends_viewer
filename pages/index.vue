<template>
  <div id="container">
    <!-- Prefectures -->
    <div id="top">
      <div v-if="isPrefecturesLoading">
        <p>Loading prefectures...</p>
      </div>
      <div v-if="isPrefecturesError">
        <p>Error when loading prefectures.</p>
        <button @click="loadPrefectures">Retry</button>
      </div>
      <li v-for="{ name, code } in prefectures" :key="name">
        <input
          type="checkbox"
          :value="name"
          :checked="isPrefectureSelected[code] == true"
          @change="onPrefectureCheck(code, $event)"
        />
        <label :for="name">{{ name }}</label>
      </li>
      <p>{{ JSON.stringify(prefectures) }}</p>
    </div>

    <!-- Populations -->
    <div id="bottom">
      <div v-if="canPopulationShow" class="graph-container">
        <div v-if="isPopulationsLoading" class="graph-container">
          <p>Loading populations...</p>
        </div>
        <div v-if="isPopulationsError" class="graph-container">
          <p>Error when loading populations.</p>
          <button @click="loadPopulations">Retry</button>
        </div>
        <div class="graph-container">
          <PopulationsGraph :populations="populations" />
        </div>
        <p>{{ JSON.stringify(populations) }}</p>
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

#top {
  overflow: scroll;
  flex: 1;
  height: 100%;
}

#bottom {
  display: flex;
  position: relative;
  flex: 1;
  height: 100%;
}

.graph-container {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
