<script setup lang="ts">
defineProps({
  icon: String,
  description: String,
})
</script>

<template>
  <div class="flex flex-wrap items-center justify-center">
    <div class="flex w-1/3 h-16 items-center justify-center">
      <img :src="icon" alt="icon" class="w-2/3 h-4/5"/>
    </div>
    <p class="text-center w-2/3 px-8 py-4">{{ description }}</p>
  </div>
</template>

<style scoped>

</style>