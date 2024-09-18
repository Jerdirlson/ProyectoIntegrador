<script setup lang="ts">
import { ref } from 'vue';
import StepperComponent from "@/components/Stepper/StepperComponent.vue";
import SelectDateAppointment from "@/components/appointment/SelectDateAppointment.vue";
import formsClient from "@/components/appointment/formsClient.vue";

const steps = ref([
  SelectDateAppointment,
  SelectDateAppointment,
  SelectDateAppointment,
  formsClient
]);
</script>

<template>
    <StepperComponent>
      <template #default="{ currentStep }">
        <component :is="steps[currentStep - 1]" />
      </template>
    </StepperComponent>
</template>