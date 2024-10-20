<script setup lang="ts">
import { ref } from 'vue';
import CancelTable from "@/components/DashboardUser/CancelTable.vue";
import axios from 'axios';

// Estado reactivo para almacenar citas
interface Cita {
  idCita: string;
  paciente: string;
  hora: string;
  servicio: string;
  cc: string;
  doc: string;
  nombrePaciente: string;
  nombreServicio: string;
  nombreDoctor: string;
}

const citas = ref<Cita[]>([]);

// Estado reactivo para almacenar el ID de la cita
const idCita = ref('');

// Método para obtener las citas por el ID proporcionado
const buscarCitas = async (idCita: string) => {
  try {
    const response = await axios.get(`http://localhost:3002/api/citas/getCitaId/${idCita}`);
    citas.value = [response.data];  // Ajustar el formato según tu respuesta
  } catch (error) {
    console.error('Error al buscar citas:', error);
    citas.value = [];
  }
};

// Método para cancelar la cita
const cancelarCita = async (idCita: string) => {
  try {
    await axios.delete(`http://localhost:3002/api/citas/deleteCitaId/${idCita}`);
    alert('Cita cancelada exitosamente');
    citas.value = citas.value.filter(cita => cita.idCita !== idCita);  // Remover la cita cancelada de la tabla
  } catch (error) {
    console.error('Error al cancelar cita:', error);
  }
};

</script>

<template>
  <div class="w-full h-[calc(100vh-9rem)]">
    <div class="w-full h-full p-16">
      <div class="flex flex-col h-full w-full">
        <!-- Título y descripción -->
        <div class="text-left">
          <h1 class="text-3xl font-bold mb-4">Cancelar tu cita</h1>
          <p class="text-lg">
            Explora nuestros servicios diseñados para cuidar de ti y tu familia. Desde medicina general hasta emergencias y diagnósticos avanzados,
            estamos aquí para atenderte con la mejor calidad y profesionalismo.
          </p>
        </div>

        <!-- Campo de ID y botón de búsqueda -->
        <div class="flex items-start mt-8">
          <label for="cita-id" class="font-bold">ID de la Cita</label>
          <input type="text" id="cita-id" v-model="idCita" class="border border-gray-300 rounded-md p-2 ml-2" placeholder="Ingrese el ID">
          <button @click="buscarCitas(idCita)" class="bg-blue-500 text-white py-2 px-4 rounded ml-2">Buscar</button>
        </div>

        <!-- Mostrar tabla de cancelación -->
        <div class="mt-8">
          <CancelTable :citas="citas" @cancelar="cancelarCita" />
        </div>

      </div>
    </div>
  </div>
</template>
