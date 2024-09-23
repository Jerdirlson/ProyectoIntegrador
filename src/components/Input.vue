<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: String,
  label: String,
  type: {
    type: String,
    default: 'text'
  }
});

const emit = defineEmits(['update:modelValue', 'enter']);

const onInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};

const onKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    emit('enter');
  }
};
</script>

<template>
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">{{ label }}</label>
    <input
        :type="type"
        :value="modelValue"
        @input="onInput"
        @keypress="onKeyPress"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
</template>