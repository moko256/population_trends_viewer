<!-- ロード中プログレスバー + メッセージ + 半透明背景 -->
<template>
  <div :class="$style.loadingBarBg">
    <p :class="$style.loadingText">{{ loadingMessage }}</p>
    <progress :id="progressId"></progress>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  progressId: string;
  loadingMessage: string;
}>();
</script>

<style module>
.loadingBarBg {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 8px;

  display: flex;
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;

  background: #ffffffb0;
}
.loadingText {
  text-align: center;
}
</style>
