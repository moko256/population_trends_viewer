<!-- チェックボックス + ラベル -->
<template>
  <div>
    <input
      :id="checkboxId"
      type="checkbox"
      :class="$style.checkbox"
      :checked="isChecked"
      @change="onChange($event)"
    />
    <label :for="checkboxId">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isChecked: boolean;
  onChange: (event: Event) => void;
  label: string;
}>();

const checkboxId = useId();
</script>

<style module>
.checkbox {
  margin-right: 8px;
  transform: scale(1.2);
}
</style>
