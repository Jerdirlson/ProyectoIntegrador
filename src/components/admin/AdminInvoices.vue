<script setup lang="ts">
import { ref } from 'vue';
import { obtenerFacturas, obtenerFacturaPDF } from '../../service/Adminservice';

const searchById = ref(false);
const searchQuery = ref('');
const facturas = ref([]);
const mensajeError = ref('');

const buscar = async () => {
  try {
    if (searchQuery.value.trim() === '') {
      mensajeError.value = 'Por favor, ingrese una cédula o ID.';
      return;
    }

    facturas.value = [];
    mensajeError.value = '';

    const datos = await obtenerFacturas(searchQuery.value);

    if (datos.length === 0) {
      mensajeError.value = 'No se encontraron facturas para la búsqueda.';
      return;
    }

    facturas.value = datos.map((item) => ({
      nombre: item['Nombre'],
      cc: item['CC'],
      fechadepago: new Date(item['Fecha de Pago']).toLocaleDateString(),
      idFactura: item['ID Factura'],
      idcita: item['ID Cita']
    }));
  } catch (error) {
    console.error('Error al buscar factura:', error);
    mensajeError.value = 'No se encontraron datos con este usuario';
  }
};

const verFactura = async (idCita: number) => {
  try {
    const pdfBlob = await obtenerFacturaPDF(idCita);
    const fileURL = URL.createObjectURL(new Blob([pdfBlob], { type: 'application/pdf' }));
    window.open(fileURL, '_blank');
  } catch (error) {
    console.error('Error al obtener la factura:', error);
    mensajeError.value = 'Error al obtener la factura. Por favor, intente de nuevo.';
  }
};
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex"></div>

    <div class="flex flex-1 overflow-hidden">
      <div class="flex-1 p-10 overflow-hidden bg-gray-100">
        <div class="bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl mt-10">
          <h2 class="text-2xl font-semibold mb-6 text-blue-600">Factura Electrónica</h2>

          <div class="mb-6">
            <div class="flex items-center">
              <span class="mr-2" :class="searchById ? 'text-gray-600' : 'text-blue-600'">Buscar por CC</span>
              <input type="checkbox" class="toggle-checkbox hidden" id="searchToggleFacturaElectronica" v-model="searchById" />
              <label for="searchToggleFacturaElectronica" class="toggle-label cursor-pointer">
                <span class="toggle-circle" :class="searchById ? 'translate-x-5' : ''"></span>
              </label>
              <span class="ml-2" :class="searchById ? 'text-blue-600' : 'text-gray-600'">Buscar por ID</span>
            </div>
          </div>

          <div class="mb-6">
            <label class="block text-sm text-gray-600 mb-1">{{ searchById ? 'ID de Factura' : 'Buscar por CC' }}</label>
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

          <div v-if="mensajeError" class="mb-4 p-4 bg-red-100 text-red-800 rounded-lg animate-fadeIn">
            {{ mensajeError }}
          </div>

          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CC</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Pago</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Factura</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Cita</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="facturas.length === 0">
                <td colspan="6" class="px-6 py-4 text-center text-gray-500">No hay datos disponibles.</td>
              </tr>
              <tr v-for="(factura, index) in facturas" :key="index">
                <td class="px-6 py-4 whitespace-nowrap">{{ factura.nombre }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ factura.cc }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ factura.fechadepago }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ factura.idFactura }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ factura.idcita }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button @click="verFactura(factura.idcita)" class="bg-blue-600 text-white px-3 py-1 rounded">VER</button>
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
