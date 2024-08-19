<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import BackgroundCover from '@/components/BackgroundCover/BackgroundCover.vue'

const image = '/images/doctor1.jpg'
</script>

<template>
  <main>
    <MainLayout>
      <div class="h-[calc(100vh-4rem)]">
        <BackgroundCover :image />
      </div>
    </MainLayout>
  </main>
</template>
