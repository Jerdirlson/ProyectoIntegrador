<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {toastStatus} from "@/composables/UseToast";


const alertElement = ref();

const alertHeight = computed(() => {
  return alertElement.value?.getBoundingClientRect().height + 40 ?? 0;
});

const toastStatusColorClasses = computed(() => {
  switch (toastStatus.type) {
    case 'success':
      return 'bg-green-500 border-green-600';
    case 'warning':
      return 'bg-yellow-500 border-yellow-600';
    case 'error':
      return 'bg-red-500 border-red-600';
    default:
      return 'bg-green-500 border-green-600';
  }
});

onMounted(() => {
  setTimeout(() => {
    alertElement.value.classList.remove('opacity-0');
  }, 1000);
});
</script>

<template>
  <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-2 opacity-0"
  >
    <div v-if="toastStatus.open" class="fixed bottom-4 right-4 z-[9999] w-96 max-w-[90vw]">
      <div
          class="rounded-lg px-4 py-3 shadow-lg backdrop-blur-lg bg-opacity-80"
          :class="toastStatusColorClasses"
      >
        <div class="flex items-center">
          <div class="flex-1">
            <h3 v-if="toastStatus.title" class="font-semibold text-white">
              {{ toastStatus.title }}
            </h3>
            <p class="text-white">{{ toastStatus.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped></style>
