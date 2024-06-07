<!-- 県一覧を表示するコンポーネント -->
<template>
  <ul :class="$style.prefectureGridParent">
    <li
      v-for="{ name, code } in prefectures"
      :key="name"
      :class="$style.prefectureGridChild"
    >
      <CheckParts
        :is-checked="isPrefectureSelected[code] == true"
        :label="name"
        @change="onPrefectureCheck(code, $event)"
      ></CheckParts>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type {
  PrefectureCode,
  Prefectures,
} from "~/domain_common/entity/prefecture";

const props = defineProps<{
  prefectures: Prefectures;
  isPrefectureSelected: Record<PrefectureCode, boolean>;
  selectPrefecture: (code: PrefectureCode, checked: boolean) => void;
}>();

function onPrefectureCheck(code: PrefectureCode, event: Event) {
  const checked = (event.target as HTMLInputElement).checked;
  props.selectPrefecture(code, checked);
}
</script>

<style module>
.prefectureGridParent {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  padding: 0px 16px 16px 16px;
}

.prefectureGridChild {
  list-style: none;
  padding: 4px;
}
</style>
