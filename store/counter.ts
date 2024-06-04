import { defineStore } from "pinia";

export const useCounterState = defineStore("counter", () => {
  const count = ref(0);

  const displayText = computed(() => `Now: ${count.value.toString(10)}`);

  function increment() {
    count.value++;
  }

  return { count, displayText, increment };
});
