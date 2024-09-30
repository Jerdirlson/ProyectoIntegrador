<script setup lang="ts">
import { useStepper } from '@/composables/UseStepper.ts';

const totalSteps = 5;
const { currentStep, nextStep, prevStep, isFirstStep, isLastStep } = useStepper(totalSteps);
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <div class="flex flex-col items-center">
      <h2 class="text-xl font-semibold mb-2">Paso {{ currentStep }} de {{ totalSteps }}</h2>
    </div>

    <div class="h-5/6 w-full">
      <slot :current-step="currentStep"></slot>
    </div>

    <div class="flex justify-between w-5/6 items-center h-1/6">
      <button
          class="bg-gray-400 text-white px-4 py-2 rounded"
          :disabled="isFirstStep()"
          @click="prevStep"
      >
        Anterior
      </button>

      <button
          class="bg-blue-500 text-white px-4 py-2 rounded"
          :disabled="isLastStep()"
          @click="nextStep"
      >
        Siguiente
      </button>
    </div>
  </div>
</template>
