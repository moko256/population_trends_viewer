<template>
  <div :aria-busy="isLoading" :aria-describedby="progressId">
    <slot></slot>
    <LoadingParts
      v-if="isLoading"
      :progress-id="progressId"
      :loading-message="loadingMessage"
    ></LoadingParts>
    <ErrorParts
      v-if="isError"
      :error-message="errorMessage"
      @retry="onRetry"
    ></ErrorParts>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isLoading: boolean;
  loadingMessage: string;
  isError: boolean;
  errorMessage: string;
  onRetry: () => void;
}>();

const progressId = useId();
</script>

<style scoped></style>
