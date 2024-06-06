<template>
  <div class="cover-bg">
    <p class="cover-text">{{ coverText }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  coverText: string;
}
const props = defineProps<Props>();
const coverText = computed(() => props.coverText);
</script>

<style>
.cover-bg {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;

  background: #ffffffb0;
}
.cover-text {
  text-align: center;
}
</style>
