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
interface Props {
  loading: boolean;
  loadingMessage: string;
}
defineProps<Props>();

const progressId = useId();
</script>

<style scoped></style>
