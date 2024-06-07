<template>
  <div :class="$style.coverBg">
    <p :class="$style.coverText">{{ coverText }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  coverText: string;
}
const props = defineProps<Props>();
const coverText = computed(() => props.coverText);
</script>

<style module>
.coverBg {
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
.coverText {
  text-align: center;
}
</style>
