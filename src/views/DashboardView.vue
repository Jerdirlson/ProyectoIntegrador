<script setup lang="ts">

import MainLayout from "@/layouts/MainLayout.vue";
import TypeAppointment from "@/components/appointment/AppointmentCard.vue";
import {onMounted, ref} from "vue";
import AppointmentCard from "@/components/appointment/AppointmentCard.vue";

const appointmentData = ref<{ categoria: string, servicios: string[], accion: string, href: string }[]>([]);

onMounted(async () => {
  try {
    const response = await fetch('/data/typeAppointment.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    appointmentData.value = await response.json();
  } catch (error) {
    console.error('Error fetching services data:', error);
  }
});
</script>

<template>
  <MainLayout>
    <div class="w-full h-[calc(100vh-9rem)]">
      <div class="w-full h-full p-16">
        <div class="flex flex-col h-full w-full">
          <div class="flex flex-col w-full h-1/6 px-10 gap-y-7">
            <h1 class="text-3xl font-bold">Atención</h1>
            <div class="text-xl">
              Explora nuestros servicios diseñados para cuidar de ti y tu familia.
              Desde medicina general hasta emergencias y diagnósticos avanzados, estamos aquí para atenderte con la mejor calidad y profesionalismo.
            </div>
          </div>
          <div class="flex w-full h-5/6 items-end">
            <div class="flex absolute h-14 w-96 bg-primary -left-6 top-72 rounded-3xl justify-center items-center">
              <p class="flex w-1/2 text-2xl font-bold text-neutral-200">
                Agenda tu cita
              </p>
            </div>
            <div class="flex w-full h-5/6 flex-wrap justify-center gap-16">
              <AppointmentCard
                  v-for="service in appointmentData"
                  :categoria="service.categoria"
                  :servicios="service.servicios"
                  :accion="service.accion"
                  :href="service.href"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>

</style>