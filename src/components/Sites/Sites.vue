<script setup lang="ts">
import {onMounted, ref} from "vue";
import ItemSpecialities from "@/components/Sites/ItemSites.vue";

const services = ref<{ title: string, summary: string, image : string, nameSpace: string }[]>([]);

onMounted(async () => {
  try {
    const response = await fetch('/data/sites.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    services.value = await response.json();
  } catch (error) {
    console.error('Error fetching carousel data:', error);
  }
});
</script>

<template>
  <div class="w-screen h-auto">
    <div class="flex h-1/6 justify-center items-center">
      <p class="text-4xl font-bold py-16">
        Sedes
      </p>
    </div>
    <div class="flex flex-col h-5/6 justify-center items-center">
      <div class="flex h-4/5 w-5/6 flex-wrap justify-center gap-16">
        <ItemSpecialities
            v-for="service in services"
            :key="service.title"
            :title="service.title"
            :summary="service.summary"
            :img="service.img"
            :nameSpace="service.nameSpace"
        />
      </div>
      <div class="flex h-1/5 justify-center items-center">
        <p class="h-1/2 w-5/6 text-center text-md py-10">
          Descubre una amplia gama de servicios médicos de alta calidad en VitaMed. Desde consultas generales hasta tratamientos especializados, nuestro equipo de profesionales expertos
          está aquí para cuidar de ti. Con tecnología de vanguardia y un enfoque centrado en el paciente, estamos comprometidos en proporcionarte la mejor atención posible para tu salud y bienestar.
        </p>
      </div>
    </div>
  </div>
</template>