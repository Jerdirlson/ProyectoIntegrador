<script setup lang="ts">
import { ref } from 'vue';
import RescheduleTable from '../components/DashboardUser/RescheduleTable.vue'; // Asegúrate de tener el componente para la tabla
import { obtenerCitasPorId } from '../service/PatientService'; // Asegúrate de tener el servicio en la carpeta 'services'

const idCita = ref('');  // ID de la cita ingresada por el usuario
const citas = ref<any[]>([]);   // Aquí se almacenarán las citas obtenidas
const error = ref('');   // Para manejar el mensaje de error

const buscarCitas = async () => {
  try {
    error.value = '';  // Limpiar errores anteriores
    const result = await obtenerCitasPorId(idCita.value);  // Llama al servicio para obtener citas
    citas.value = [result];  // Guarda las citas en el estado reactivo
  } catch (e) {
    citas.value = [];  // Limpia el array de citas si hay un error
    error.value = 'No se encontraron citas';  // Mensaje de error
  }
};
</script>

<template>
  <div class="w-full h-[calc(100vh-9rem)]">
    <div class="w-full h-full p-16">
      <div class="flex flex-col h-full w-full">
        
        <!-- Título y descripción alineados a la izquierda -->
        <div class="text-left">
          <h1 class="text-3xl font-bold mb-4">Re-agendar tu cita</h1>
          <p class="text-lg">
            Explora nuestros servicios diseñados para cuidar de ti y tu familia. Desde medicina general hasta emergencias y diagnósticos avanzados,
            estamos aquí para atenderte con la mejor calidad y profesionalismo.
          </p>
        </div>

        <!-- Campo de ID y botón Buscar -->
        <div class="flex items-start mt-8">
          <label for="cita-id" class="font-bold">ID de la Cita</label>
          <input type="text" id="cita-id" v-model="idCita" class="border border-gray-300 rounded-md p-2 ml-2" placeholder="Ingrese el ID">
          <button @click="buscarCitas" class="bg-blue-500 text-white py-2 px-4 rounded ml-2">Buscar</button>
        </div>

        <!-- Mostrar tabla siempre -->
        <div class="mt-8">
          <RescheduleTable :citas="citas" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-primary {
  background-color: #1e90ff;
}
.text-neutral-200 {
  color: #f0f0f0;
}
</style>