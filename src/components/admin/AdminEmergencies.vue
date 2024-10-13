<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { obtenerEmergenciasDetalles } from '../../service/Adminservice';

// Declaración de la referencia para almacenar los datos de los pacientes
const pacientes = ref([]);

// Función para generar filas vacías en la tabla
const emptyRows = (count) => {
  return Array.from({ length: count });
};

// Función para cargar emergencias desde el backend
const cargarEmergencias = async () => {
  try {
    const datos = await obtenerEmergenciasDetalles();
    pacientes.value = datos.map((item) => ({
      nombre: item['Nombre'],
      cc: item['CC'],
      horaLlegada: new Date(item['Hora de Llegada']).toLocaleTimeString(),
      nivelEmergencia: item['Nivel de Emergencia'],
      estado: item['Estado'],
      doctorAsignado: item['Doctor Asignado']
    }));
  } catch (error) {
    console.error('Error al cargar emergencias:', error);
  }
};

// Llamada a la función al montar el componente
onMounted(() => {
  cargarEmergencias();
});
</script>

<template>
  <div class="flex flex-1 overflow-hidden">
    <!-- Contenido principal, solo la tabla -->
    <div class="flex-1 p-10 bg-gray-100 overflow-y-auto">
      <!-- Mensaje de bienvenida -->
      <p class="text-2xl font-bold text-center text-blue-600 mb-6 mt-10">Emergencias Asignadas</p>
      
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="py-2 px-4 border-b">Nombre</th>
            <th class="py-2 px-4 border-b">CC</th>
            <th class="py-2 px-4 border-b">Hora de llegada</th>
            <th class="py-2 px-4 border-b">Nivel de emergencia</th>
            <th class="py-2 px-4 border-b">Estado</th>
            <th class="py-2 px-4 border-b">Doctor asignado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(paciente, index) in pacientes" :key="index">
            <td class="py-2 px-4 border-b">{{ paciente.nombre }}</td>
            <td class="py-2 px-4 border-b">{{ paciente.cc }}</td>
            <td class="py-2 px-4 border-b">{{ paciente.horaLlegada }}</td>
            <td class="py-2 px-4 border-b">{{ paciente.nivelEmergencia }}</td>
            <td class="py-2 px-4 border-b">{{ paciente.estado }}</td>
            <td class="py-2 px-4 border-b">{{ paciente.doctorAsignado }}</td>
          </tr>
          <!-- Mensaje si no hay más pacientes -->
          <tr v-if="pacientes.length < 5">
            <td colspan="6" class="py-2 px-4 border-b text-center text-gray-500">
              No hay más pacientes asignados.
            </td>
          </tr>
          <!-- Espacio vacío si hay menos de 5 pacientes -->
          <tr v-for="index in emptyRows(5 - pacientes.length)" :key="'empty-' + index">
            <td class="py-2 px-4 border-b"></td>
            <td class="py-2 px-4 border-b"></td>
            <td class="py-2 px-4 border-b"></td>
            <td class="py-2 px-4 border-b"></td>
            <td class="py-2 px-4 border-b"></td>
            <td class="py-2 px-4 border-b"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Estilos adicionales para la tabla */
.bg-gray-200 {
  background-color: #f7fafc;
}

.bg-blue-600 {
  background-color: #3182ce;
}
</style>
