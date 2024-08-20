<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import BackgroundCover from '@/components/BackgroundCover/BackgroundCover.vue'
import InfiniteCarousel from "@/components/carousel/infiniteCarousel.vue";

const image = '/images/home/doctor1.jpg'
</script>

<template>
  <main>
    <MainLayout>
      <div class="h-[calc(100vh-4rem)]">
        <BackgroundCover :image />
      </div>
      <InfiniteCarousel />
    </MainLayout>
  </main>
</template>
