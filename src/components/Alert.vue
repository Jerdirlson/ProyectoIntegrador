<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import {computed, onMounted, ref} from "vue";
import {alertStatus} from "@/composables/UseAlert";

const alertElement = ref();

const alertHeight = computed(() => {
  return alertElement.value?.getBoundingClientRect().height + 40 ?? 0
})

onMounted(() => {
  setTimeout(() => {
    alertElement.value.classList.remove('opacity-0')
  }, 1000)
})


</script>

<template>
  <div class="fixed w-full h-40 bottom-1 left-0 px-8 py-4 flex justify-center items-end z-[1000]"
       :class="[alertStatus.open ? '' : 'pointer-events-none']">
    <div class="w-full border max-h-32 overflow-hidden rounded-xl border-third bg-third px-5 py-4 flex flex-col relative duration-200 opacity-0"
         :style="{transform: `translateY(${alertStatus.open ? 0 : alertHeight}px)`}" ref="alertElement">
      <span class="text-xl font-bold text-white">
          {{alertStatus.title}}
      </span>
      <span class="text-sm text-white">
        {{alertStatus.description}}
      </span>
      <div>
        <Icon icon="close" class="text-white absolute top-4 right-4 cursor-pointer bg-third/20 backdrop-blur-3xl hover:scale-110 duration-200" @click="alertStatus.open = false"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
