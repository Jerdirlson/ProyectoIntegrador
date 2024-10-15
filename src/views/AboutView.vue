<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import About from '@/components/BackgroundCover/About.vue'
import history from '@/components/carouselHistory/history.vue'
import wavyline from '@/components/wavyline.vue';
import Mision from '@/components/BackgroundCover/Mision.vue';
import Motivo from '@/components/BackgroundCover/Motivo.vue';
import Objetivo from '@/components/BackgroundCover/Objetivo.vue';
</script>

<template>
  <main>
    <MainLayout>
      <section class="section">
        <About />
        <div class="flex absolute h-14 w-96 bg-primary -left-6 top-[750px] rounded-3xl justify-center items-center">
          <p class="text-2xl font-bold text-neutral-200">
            Información
          </p>
        </div>
      </section>
      <section class="section">
        <history />
      </section>
      <section class="section">
        <Mision />
      </section>
      <section class="section"> 
        <Motivo />
      </section>
      <section class="section">
        <Objetivo />
      </section>
      <section class="section">
      </section>
    </MainLayout>
  </main>
</template>

<style scoped>
.section {
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>
