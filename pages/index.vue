<template>
  <div>
    <p>{{ text }}</p>
    <button @click="countUp">Count up!</button>
  </div>
</template>

<script setup lang="ts">
import { useCounterState } from "~/store/counter";

const store = useCounterState();
const text = computed(() => store.displayText);

function countUp() {
  console.log("Hello!");
  store.increment();
}
</script>

<style />
