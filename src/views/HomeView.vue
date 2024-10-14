<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import BackgroundCover from '@/components/BackgroundCover/BackgroundCover.vue'
import InfiniteCarousel from "@/components/carousel/infiniteCarousel.vue";
import Specialties from "@/components/Sites/Sites.vue";
import Toast from "@/components/Toast.vue";

const image = '/images/home/doctor1.jpg'
</script>

<template>
  <main>
    <MainLayout>
      <div class="h-[calc(100vh-4rem)]">
        <BackgroundCover :image />
      </div>
      <Specialties />
      <InfiniteCarousel />
      <Toast />
    </MainLayout>
  </main>
</template>
