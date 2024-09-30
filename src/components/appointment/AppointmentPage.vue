<script setup lang="ts">
import { ref } from 'vue';
import StepperComponent from "@/components/Stepper/StepperComponent.vue";
import SelectDateAppointment from "@/components/appointment/SelectDateAppointment.vue";
import selectorService from '@/components/appointment/selectorService.vue';
import formsClient from "@/components/appointment/formsClient.vue";

const steps = ref([
  selectorService,
  selectorService,//falta el de especialidad por si algo
  SelectDateAppointment,
  formsClient
]);
</script>

<template>
  <div class="flex justify-center items-center p-1">
    <div class=" overflow-hidden w-full">
      <!-- Contenedor del Stepper con contenido ajustado -->
      <StepperComponent>
        <template #default="{ currentStep }">
          <div class="p-0 border-b">
            <!-- Contenido dinámico del paso actual -->
            <component :is="steps[currentStep - 1]" class="w-full" />
          </div>
        </template>
      </StepperComponent>
    </div>
  </div>
</template>
