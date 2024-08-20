<script setup lang="ts">
import BreadCrum from '@/components/BackgroundCover/BreadCrum.vue'

const props = defineProps(['image'])

</script>
<template>
<div class="w-screen h-full">
  <div class="w-full h-5/6 relative">
    <img :src="props.image" :alt="'Background Cover'" class="object-cover object-top w-full h-full block absolute" />
    <div class="absolute w-1/3 top-60 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl">
      <p class="text-4xl font-bold">
        Tu bienestar, nuestra prioridad
      </p>
      <br />
      <p>
        En SaludPro, nos esforzamos por ofrecerte una experiencia de atención médica que va más allá de lo ordinario. Nuestro equipo dedicado de profesionales está comprometido con tu bienestar en cada paso del camino.
        Desde consultas médicas hasta tratamientos especializados.
      </p>
    </div>
  </div>
  <div class="flex w-full h-1/6 bg-secondary justify-center">
    <BreadCrum />
  </div>
</div>
</template>

<style scoped>

</style>