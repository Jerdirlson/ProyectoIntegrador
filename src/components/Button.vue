<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  meta: {
    type: Object,
    default: () => ({ twColor: 'primary' })
  }
});
</script>

<template>
  <button
      class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      :class="meta.twColor"
  >
    <slot></slot>
  </button>
</template>