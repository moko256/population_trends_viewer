<!-- エラーメッセージ + リトライボタン + 半透明背景 -->
<template>
  <div :class="$style.errorBg">
    <p :class="$style.errorText">{{ errorMessageWithIcon }}</p>
    <button :class="$style.errorButton" @click="onRetry">
      {{ $t("reloadAction") }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  errorMessage: string;
  onRetry: () => void;
}>();
const errorMessageWithIcon = computed(() => "⚠ " + props.errorMessage);
</script>

<style module>
.errorBg {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;

  background: #ffccccb0;
}
.errorButton {
  border-style: solid;
  border-color: #252525;
  border-width: 2px;
  border-radius: 4px;
  padding: 4px 16px 4px 16px;
}
.errorText {
  text-align: center;
}
</style>
