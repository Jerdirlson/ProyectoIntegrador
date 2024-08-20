<script setup lang="ts">
import ItemsBreadCrum from '@/components/BackgroundCover/ItemsBreadCrum.vue'
import { onMounted, ref } from 'vue'

const items = ref([])

onMounted(async () => {
  const response = await fetch('/data/breadCrumData.json')
  items.value = await response.json()
})
</script>

<template>
<div class="flex w-5/6 h-4/5 bg-opacity-95 bg-third -translate-y-1/2 rounded-3xl flex-wrap">
  <div class="flex w-1/5 justify-center items-center">
    <h1 class="text-4xl font-bold">
      Servicios
    </h1>
  </div>
  <ItemsBreadCrum
    v-for="(item, index) in items"
    :key="index"
    :icon="item.icon"
    :description="item.description"
    class="w-1/5"
  />
</div>
</template>
<style scoped>

</style>