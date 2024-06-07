<template>
  <div :aria-busy="loading" :aria-describedby="progressId">
    <slot></slot>
    <LoadingParts
      v-if="loading"
      :progress-id="progressId"
      :loading-message="loadingMessage"
    ></LoadingParts>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loading: boolean;
  loadingMessage: string;
}>();

const progressId = useId();
</script>

<style scoped></style>
