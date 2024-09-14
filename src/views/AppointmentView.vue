<script setup lang="ts">

import AppointmentLayout from "@/layouts/AppointmentLayout.vue";
import StepperComponent from "@/components/Stepper/StepperComponent.vue";
import AppointmentPage from "@/components/appointment/AppointmentPage.vue";
</script>

<template>
  <AppointmentLayout>
    <div class="flex flex-col w-4/5 h-4/5 justify-center items-center bg-neutral-200 rounded-3xl">
      <div class="flex h-1/6 w-full justify-center items-center flex-col">
        <h1 class="flex h-3/5 justify-center items-center text-3xl font-bold">
          Agendamiento de cita
        </h1>
        <div class="flex h-2/5 w-4/5 border-t-[2px] border-t-neutral-600"></div>
      </div>
      <div class="flex flex-col h-5/6 w-full">
        <div class="flex h-full w-full justify-center">
          <AppointmentPage />
        </div>
      </div>
    </div>
  </AppointmentLayout>
</template>

<style scoped>

</style>