<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ name: string; color?: string }>();

const svgPath = computed(() => `/svg/${props.name}.svg`);
</script>

<template>
  <img :src="svgPath" :alt="props.name" :style="{ color: props.color }" />
</template>
