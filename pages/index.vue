<template>
  <div>
    <!-- Prefectures -->
    <div>
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
    <div>
      <div v-if="isPopulationsLoading">
        <p>Loading populations...</p>
      </div>
      <div v-if="isPopulationsError">
        <p>Error when loading populations.</p>
        <button @click="loadPopulations">Retry</button>
      </div>
      <PopulationsGraph :populations="populations" />
      <p>{{ JSON.stringify(populations) }}</p>
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

<style />
