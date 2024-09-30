<script setup lang="ts">
import { ref } from 'vue';

// Arreglo de especialidades
const especialidad = ref("Medicina General");

// Arreglo de servicios
const servicios = ref([
  { id: 1, nombre: "Consulta Médica" },
  { id: 2, nombre: "Exámenes de Laboratorio" },
  { id: 3, nombre: "Vacunación" },
  { id: 4, nombre: "Control de Salud" },
]);

</script>

<template>
  <div class="mb-16 justify-center items-center">
    <!-- Paso e instrucciones -->
    <div class="text-center mb-5 p-2">
      <p class="text-2xl font-semibold mb-4">
        Seleccione un servicio de <strong>VitaMed IPS - </strong><br>
        {{ especialidad }}
      </p>
    </div>

    <div class="p-2 justify-center items-center">
      <div class="space-y-5">
        <div v-for="servicio in servicios" :key="servicio.id" class="flex items-center">
          <input
            :id="'servicio' + servicio.id"
            type="radio"
            name="servicio"
            :value="servicio.id"
            class="mr-3"
          />
          <label
            :for="'servicio' + servicio.id"
            class="block text-lg font-medium text-gray-700"
          >
            {{ servicio.nombre }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
