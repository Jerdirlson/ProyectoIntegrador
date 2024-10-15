<script setup lang="ts"> 
import { ref } from 'vue';
import { obtenerColillas } from '../../service/Adminservice'; // Asegúrate de importar la función adecuada

// Variables reactivas
const searchById = ref(false);
const searchQuery = ref('');
const colillas = ref([]);
const mensajeError = ref('');

// Función para buscar
const buscar = async () => {
  try {
    if (searchQuery.value.trim() === '') {
      console.error('Por favor, ingrese una cédula o ID.');
      mensajeError.value = 'Por favor, ingrese una cédula o ID.'; // Mostrar mensaje de error
      return; // Salir si el campo de búsqueda está vacío
    }

    const searchField = searchById.value ? 'idColilla' : 'cc';
    const response = await obtenerColillas(searchQuery.value); // Obtener colillas del servicio

    // Mapear los datos devueltos a la estructura deseada
    colillas.value = response.map((item) => ({
      nombre: item['Nombre'], // Ajusta el campo según la respuesta de tu API
      cc: item['CC'], // Ajusta el campo según la respuesta de tu API
      fechaColilla: new Date(item['Fecha Colilla']).toLocaleDateString(), // Ajusta el campo según la respuesta de tu API
      idColilla: item['ID Colilla'], // Ajusta el campo según la respuesta de tu API
      estado: item['Estado'] // Ajusta el campo según la respuesta de tu API
    }));
  } catch (error) {
    console.error('Error al buscar colillas:', error);
    mensajeError.value = 'No se encotraron datos con esta cedula .'; // Mostrar mensaje de error
  }
};
</script>
<template>
  <div class="flex flex-col h-screen">
    <div class="flex"></div>

    <div class="flex flex-1 overflow-hidden">
      <div class="flex-1 p-10 overflow-hidden bg-gray-100">
        <div class="bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl mt-10">
          <h2 class="text-2xl font-semibold mb-6 text-blue-600">Colilla de Pago</h2>

          <!-- Switch personalizado para buscar por ID o CC -->
          <div class="mb-6">
            <div class="flex items-center">
              <span class="mr-2" :class="searchById ? 'text-gray-600' : 'text-blue-600'">Buscar por CC</span>
              <input type="checkbox" class="toggle-checkbox hidden" id="searchToggleColillaPago" v-model="searchById" />
              <label for="searchToggleColillaPago" class="toggle-label cursor-pointer">
                <span class="toggle-circle" :class="searchById ? 'translate-x-5' : ''"></span>
              </label>
              <span class="ml-2" :class="searchById ? 'text-blue-600' : 'text-gray-600'">Buscar por ID</span>
            </div>
          </div>

          <!-- Campo para buscar -->
          <div class="mb-6">
            <label class="block text-sm text-gray-600 mb-1">{{ searchById ? 'ID de Colilla' : 'Buscar por CC' }}</label>
            <div class="flex items-center space-x-2">
              <input
                type="text"
                v-model="searchQuery"
                :placeholder="searchById ? 'Ingrese ID' : 'Ingrese CC'"
                class="flex-1 p-2 border border-gray-300 rounded transition duration-300 focus:border-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              />
              <button
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-300"
                @click="buscar"
              >
                Buscar
              </button>
            </div>
          </div>

          <!-- Mensaje de error -->
          <div v-if="mensajeError" class="mb-4 p-4 bg-red-100 text-red-800 rounded-lg animate-fadeIn">
            {{ mensajeError }}
          </div>

          <!-- Información de la tabla -->
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CC</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Colilla</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Colilla</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="colillas.length === 0">
                <td colspan="6" class="px-6 py-4 text-center text-gray-500">No hay datos disponibles.</td>
              </tr>
              <tr v-for="(colilla, index) in colillas" :key="index">
                <td class="px-6 py-4 whitespace-nowrap">{{ colilla.nombre }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ colilla.cc }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ colilla.fechaColilla }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ colilla.idColilla }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ colilla.estado }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button class="bg-blue-600 text-white px-3 py-1 rounded">VER</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.toggle-label {
  display: inline-flex;
  align-items: center;
  width: 60px;
  height: 30px;
  background-color: #e4e4e4;
  border-radius: 50px;
  position: relative;
  cursor: pointer;
}

.toggle-circle {
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 0.3s;
  position: absolute;
  top: 3px;
  left: 3px;
}

.toggle-checkbox:checked + .toggle-label {
  background-color: #4c9aff;
}

.toggle-checkbox {
  display: none; /* Ocultar el checkbox */
}

.toggle-circle.translate-x-5 {
  transform: translateX(30px);
}

/* Animación para el mensaje de error */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}
</style>
