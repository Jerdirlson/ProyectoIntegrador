<script setup lang="ts">
import { ref } from 'vue';
import ViewTable from "@/components/DashboardUser/ViewTable.vue"; // Asegúrate de tener el componente
import axios from 'axios';  // O el servicio que estés usando para las solicitudes

// Estado reactivo para almacenar el ID de la cita y las citas obtenidas
const idCita = ref('');  // El ID que el usuario ingresa
const citas = ref<any[]>([]);  // Donde se almacenan las citas obtenidas

// Método para buscar las citas basado en el ID
const buscarCitas = async (idCita: string) => {
  try {
    const response = await axios.get(`http://localhost:3002/api/citas/getCitaId/${idCita}`);
    citas.value = [response.data];  // Ajustar según el formato de la respuesta
  } catch (error) {
    console.error('Error al buscar citas:', error);
    citas.value = [];  // Limpiar el array si hay un error
  }
};
</script>

<template>
  <div class="w-full h-[calc(100vh-9rem)]">
    <div class="w-full h-full p-16">
      <div class="flex flex-col h-full w-full">
        
        <!-- Título y descripción alineados a la izquierda -->
        <div class="text-left">
          <h1 class="text-3xl font-bold mb-4">Ver tu cita</h1>
          <p class="text-lg">
            Explora nuestros servicios diseñados para cuidar de ti y tu familia. Desde medicina general hasta emergencias y diagnósticos avanzados,
            estamos aquí para atenderte con la mejor calidad y profesionalismo.
          </p>
        </div>

        <!-- Campo de ID y botón Buscar -->
        <div class="flex items-start mt-8">
          <label for="cita-id" class="font-bold">ID de la Cita</label>
          <input type="text" id="cita-id" v-model="idCita" class="border border-gray-300 rounded-md p-2 ml-2" placeholder="Ingrese el ID">
          <button @click="buscarCitas(idCita)" class="bg-blue-500 text-white py-2 px-4 rounded ml-2">Buscar</button>
        </div>

        <!-- Tabla para mostrar citas obtenidas -->
        <div class="mt-8">
          <ViewTable :citas="citas" />
        </div>
      </div>
    </div>
  </div>
</template>
