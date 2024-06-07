<template>
  <div :class="$style.rootContainer">
    <!-- 県一覧 -->
    <div :class="$style.prefecturesContainer">
      <LoadableContainerParts
        :is-loading="isPrefecturesLoading"
        :loading-message="$t(`prefectureLoading`)"
        :is-error="isPrefecturesError"
        :error-message="$t('prefecturesLoadError')"
        @retry="loadPrefectures"
      >
        <!-- 県一覧 スクロール範囲 -->
        <div :class="$style.prefecturesContainerChild">
          <!-- 県一覧 タイトル -->
          <TitleParts />
          <h2 :class="$style.prefecturesHeader">
            {{ $t("prefecturesHeader") }}
          </h2>

          <!-- 県一覧 本体 -->
          <ul :class="$style.prefectureGridParent">
            <li
              v-for="{ name, code } in prefectures"
              :key="name"
              :class="$style.prefectureGridChild"
            >
              <input
                type="checkbox"
                :class="$style.prefectureCheckbox"
                :value="name"
                :checked="isPrefectureSelected[code] == true"
                @change="onPrefectureCheck(code, $event)"
              />
              <label :for="name">{{ name }}</label>
            </li>
          </ul>
        </div>
      </LoadableContainerParts>
    </div>

    <!-- 区切り線 -->
    <div :class="$style.rootContainerDivider"></div>

    <!-- 人口グラフ -->
    <div :class="$style.populationsContainer">
      <!-- 人口グラフ 本体 -->
      <LoadableContainerParts
        :is-loading="isPopulationsLoading"
        :loading-message="$t(`populationsLoading`)"
        :is-error="isPopulationsError"
        :error-message="$t('populationsLoadError')"
        @retry="loadPopulations"
      >
        <div
          :class="`${$style.populationsContainerChild} ${$style.graphContainer}`"
        >
          <PopulationsGraph :populations="populations" />
        </div>

        <!-- 人口グラフ 都道府県選択なし -->
        <CoverTextParts
          v-if="!canPopulationLoadWithSelections"
          :cover-text="$t('populationsNeedPrefectures')"
        />
      </LoadableContainerParts>
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

<style module>
/* 最上位レイアウト */
.rootContainer {
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
  .rootContainer {
    flex-direction: row;
  }
}

.rootContainerDivider {
  flex-basis: 2px;
  background-color: gray;
}

/* 県一覧 */

.prefecturesContainer {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}

.prefecturesContainerChild {
  position: absolute;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}

.prefecturesHeader {
  margin: 4px 16px;
  padding: 4px;

  width: 7em;
  text-align: center;
  flex: initial;
  border: solid 2px gray;

  font: 1em normal;
}

/* 県チェックボックス一覧 */

.prefectureGridParent {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  padding: 0px 16px 16px 16px;
}

.prefectureGridChild {
  list-style: none;
  padding: 4px;
}

.prefectureCheckbox {
  margin-right: 8px;
  transform: scale(1.2);
}

/* 人口グラフ */

.populationsContainer {
  position: relative;
  display: flex;
  flex: 1;
}

.populationsContainerChild {
  position: absolute;
  width: 100%;
  height: 100%;
}

.graphContainer {
  display: flex;
  padding: 16px;
}

/*
  縦長:
  グラフが大きくならないように最大の高さを固定

  横長:
  県一覧の横幅を固定
*/
@media (orientation: portrait) {
  .populationsContainer {
    max-height: 30em;
  }
}

@media (orientation: landscape) {
  .prefecturesContainer {
    flex: initial;
    width: 25em;
  }
}
</style>
