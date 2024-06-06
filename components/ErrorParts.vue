<template>
  <div class="error-bg">
    <p class="error-text">{{ errorMessage }}</p>
    <button class="error-button" @click="onRetry">Retry</button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  errorMessage: string;
  onRetry: () => void;
}
const props = defineProps<Props>();
const errorMessage = computed(() => "⚠ " + props.errorMessage);
const onRetry = computed(() => props.onRetry);
</script>

<style>
.error-bg {
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
.error-button {
  border-style: solid;
  border-color: #252525;
  border-width: 2px;
  border-radius: 4px;
  padding: 4px 16px 4px 16px;
}
.error-text {
  text-align: center;
}
</style>
