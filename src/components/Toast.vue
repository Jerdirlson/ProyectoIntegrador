<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

import { toastStatus} from "@/composables/UseToast";
import SvgIcon from "@/components/SvgIcon.vue";

const alertElement = ref();
const progressBar = ref();

const toastStatusColorClasses = computed(() => {
  switch (toastStatus.type) {
    case 'warning':
      return 'bg-yellow-500';
    case 'error':
      return 'bg-red-500';
    default:
      return 'bg-green-500';
  }
});

const progressBarColor = computed(() => {
  switch (toastStatus.type) {
    case 'warning':
      return 'bg-yellow-300';
    case 'error':
      return 'bg-red-300';
    default:
      return 'bg-green-300';
  }
});

const iconName = computed(() => {
  switch (toastStatus.type) {
    case 'warning':
      return 'exclamation-circle';
    case 'error':
      return 'disabled';
    default:
      return 'check-circle';
  }
});

const duration = computed(() => toastStatus.timeoutId ?? 5000);
let startTime: number | null = null;
let animationFrame: number;

const updateProgressBar = (timestamp: number) => {
  if (!startTime) startTime = timestamp;
  const elapsedTime = timestamp - startTime;
  const progress = Math.min(elapsedTime / duration.value, 1);

  if (progressBar.value) {
    progressBar.value.style.transform = `scaleX(${progress})`;
  }

  if (progress < 1 && toastStatus.open) {
    animationFrame = requestAnimationFrame(updateProgressBar);
  } else {
    toastStatus.open = false;
    cancelAnimationFrame(animationFrame);
  }
};

watch(
    () => toastStatus.open,
    (newStatus) => {
      if (newStatus) {
        startTime = null;
        animationFrame = requestAnimationFrame(updateProgressBar);
      } else {
        cancelAnimationFrame(animationFrame);
      }
    },
);

onMounted(() => {
  if (alertElement.value) {
    alertElement.value.classList.remove('opacity-0');
  }
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrame);
});

const closeToast = () => {
  toastStatus.open = false;
};
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
    <div v-if="toastStatus.open" class="fixed bottom-8 right-8 z-[9999] max-w-[95vw]">
      <div
          ref="alertElement"
          class="rounded-xl px-6 py-4 shadow-xl backdrop-blur-xl bg-opacity-90 relative overflow-hidden min-w-[400px]"
          :class="toastStatusColorClasses"
      >
        <div class="flex flex-wrap gap-6">
          <div class="flex items-center justify-center">
            <SvgIcon :name="iconName" color="white" class="text-white h-12 w-12" />
          </div>
          <div class="flex items-center flex-1">
            <div class="w-full pr-8">
              <h3 v-if="toastStatus.title" class="font-semibold text-white text-2xl mb-2">
                {{ toastStatus.title }}
              </h3>
              <p class="text-white text-xl leading-relaxed break-words w-full max-w-lg">
                {{ toastStatus.description }}
              </p>
            </div>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 h-1.5 w-full overflow-hidden" :class="progressBarColor">
          <div
              ref="progressBar"
              class="h-full w-full origin-left transition-transform duration-100 ease-linear"
              style="will-change: transform"
              :class="toastStatusColorClasses"
          ></div>
        </div>
        <button class="absolute top-4 right-4 text-white/80 hover:text-white transition-colors" @click="closeToast">
          <SvgIcon name="close" color="white" class="w-5 h-5" />
        </button>
      </div>
    </div>
  </Transition>
</template>
