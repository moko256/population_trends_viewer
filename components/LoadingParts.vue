<template>
  <div class="loading-bar-bg">
    <progress :id="progressId"></progress>
  </div>
</template>

<script setup lang="ts">
interface Props {
  progressId: string;
}
const props = defineProps<Props>();
const progressId = computed(() => props.progressId);
</script>

<style>
.loading-bar-bg {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;

  background: #ffffffb0;
}
</style>
