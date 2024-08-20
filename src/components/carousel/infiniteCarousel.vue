<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ImagesCarousel from "@/components/carousel/ImagesCarousel.vue";

const items = ref<{ src: string, alt: string }[]>([]);

onMounted(async () => {
  try {
    const response = await fetch('/data/carouselData.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    items.value = await response.json();
  } catch (error) {
    console.error('Error fetching carousel data:', error);
  }
});
</script>

<template>
  <div class="flex items-center justify-center">
    <ImagesCarousel :images="items" />
  </div>
</template>

<style scoped>
/* Ajustes del componente principal */
</style>
