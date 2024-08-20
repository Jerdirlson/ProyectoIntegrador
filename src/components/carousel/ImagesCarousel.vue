<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'

const props = defineProps<{
  images: { src: string, alt: string }[]
}>();

const items = ref(props.images);
const currentIndex = ref(0);

const totalItems = computed(() => items.value.length);
const itemWidth = computed(() => 100 / 4);

const translateX = computed(() => {
  return `-${currentIndex.value * itemWidth.value}%`
});

const startCarousel = () => {
  setInterval(() => {
    if (currentIndex.value >= totalItems.value - 4) {
      currentIndex.value = 0;
    } else {
      currentIndex.value = (currentIndex.value + 1) % totalItems.value;
    }
  }, 3000);
}

watch(() => props.images.length, (newLength) => {
  items.value = props.images;
  if (newLength > 0) {
    startCarousel();
  }
});
</script>

<template>
  <div class="w-full overflow-hidden relative">
    <div
        class="flex transition-transform duration-1000 ease-in-out"
        :style="{
        transform: `translateX(${translateX})`,
        width: `${totalItems.value * itemWidth.value}%`
      }"
    >
      <div
          v-for="(item, index) in items"
          :key="index"
          class="flex-shrink-0 w-1/4 flex justify-center items-center"
      >
        <img :src="item.src" :alt="item.alt" class="w-full h-full object-cover transform" />
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  transition: transform 0.5s ease;
}

img:hover {
  transform: scale(1.1);
}

.transition-transform {
  will-change: transform;
}
</style>
