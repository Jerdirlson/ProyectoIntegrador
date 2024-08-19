<script setup lang="ts">
import BreadCrum from '@/components/BackgroundCover/BreadCrum.vue'

const props = defineProps(['image'])

</script>
<template>
<div class="w-screen h-full">
  <div class="w-full h-5/6 relative">
    <img :src="props.image" :alt="'Background Cover'" class="object-cover object-top w-full h-full block absolute" />
    <div class="absolute w-1/3 top-60 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold">
      <p>
        Titulo a implementar
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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