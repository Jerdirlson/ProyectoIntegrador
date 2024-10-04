<script setup lang="ts">
import { ref } from 'vue';
import { useStepper } from '@/composables/UseStepper.ts';
import router from "@/router";
// Total de pasos
const totalSteps = 4;
const { currentStep, nextStep, prevStep, isFirstStep, isLastStep } = useStepper(totalSteps);

const isModalVisible = ref(false);

const email = ref(''); // Este valor debería venir del componente del formulario

const handleNextStep = () => {
  if (isLastStep()) {
    isModalVisible.value = true;
  } else {
    nextStep();
  }
};

const closeModal = () => {
  isModalVisible.value = false;
  router.push({ name: 'dashboard' });
};
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
          @click="handleNextStep"
      >
        Siguiente
      </button>
    </div>

    <!-- Modal flotante -->
    <div v-if="isModalVisible" class="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div class="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 class="text-xl font-bold mb-4">Cita Agendada</h2>
        <p class="mb-4">Su cita ha sido agendada exitosamente. Un correo de confirmación será enviado a el correo electronico registrado.</p>
        <button @click="closeModal" class="bg-blue-500 text-white px-4 py-2 rounded">Cerrar</button>
      </div>
    </div>
  </div>
</template>
