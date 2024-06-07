<template>
  <div id="container">
    <!-- 県一覧 -->
    <div id="prefectures-container">
      <LoadableContainerParts
        :loading="isPrefecturesLoading"
        :loading-message="$t(`prefectureLoading`)"
      >
        <!-- 県一覧 スクロール範囲 -->
        <div class="prefectures-container-child">
          <!-- 県一覧 タイトル -->
          <TitleParts />
          <p id="prefectures-header">{{ $t("prefecturesHeader") }}</p>

          <!-- 県一覧 本体 -->
          <ul id="prefecture-grid-parent">
            <li
              v-for="{ name, code } in prefectures"
              :key="name"
              class="prefecture-grid-child"
            >
              <input
                type="checkbox"
                class="prefecture-checkbox"
                :value="name"
                :checked="isPrefectureSelected[code] == true"
                @change="onPrefectureCheck(code, $event)"
              />
              <label :for="name">{{ name }}</label>
            </li>
          </ul>
        </div>
      </LoadableContainerParts>

      <!-- 県一覧 エラー -->
      <div v-if="isPrefecturesError" class="prefectures-container-child">
        <ErrorParts
          :error-message="$t('prefecturesLoadError')"
          @retry="loadPrefectures"
        />
      </div>
    </div>

    <!-- 区切り線 -->
    <div class="horizontal-divider"></div>

    <!-- 人口グラフ -->
    <div id="populations-container">
      <!-- 人口グラフ 本体 -->
      <LoadableContainerParts
        :loading="isPopulationsLoading"
        :loading-message="$t(`populationsLoading`)"
      >
        <div id="graph-container" class="populations-container-child">
          <PopulationsGraph :populations="populations" />
        </div>
      </LoadableContainerParts>

      <!-- 人口グラフ エラー -->
      <div v-if="isPopulationsError" class="populations-container-child">
        <ErrorParts
          :error-message="$t('populationsLoadError')"
          @retry="loadPopulations"
        />
      </div>

      <!-- 人口グラフ 都道府県選択なし -->
      <CoverTextParts
        v-if="!canPopulationLoadWithSelections"
        :cover-text="$t('populationsNeedPrefectures')"
      />
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
  canPopulationLoadWithSelections,
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

/*
  横長:
  レイアウト方向を横にする
*/
@media (orientation: landscape) {
  #container {
    flex-direction: row;
  }
}

#prefectures-container {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.prefectures-container-child {
  position: absolute;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}

#prefectures-header {
  margin: 4px 16px;
  padding: 4px;

  width: 6em;
  text-align: center;
  flex: initial;
  border: solid 2px;
  border-color: gray;
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

/*
  縦長:
  グラフが大きくならないように最大の高さを固定

  横長:
  県一覧の横幅を固定
*/
@media (orientation: portrait) {
  #populations-container {
    max-height: 30em;
  }
}

@media (orientation: landscape) {
  #prefectures-container {
    flex: initial;
    width: 25em;
  }
}

#graph-container {
  display: flex;
  padding: 16px;
}

.horizontal-divider {
  flex-basis: 2px;
  background-color: gray;
}

#prefecture-grid-parent {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  padding: 0px 16px 16px 16px;
}

.prefecture-grid-child {
  list-style: none;
  padding: 4px;
}

.prefecture-checkbox {
  margin-right: 8px;
  transform: scale(1.2);
}
</style>
