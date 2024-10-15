<script lang="ts">
import { ref } from 'vue';
import { obtenerHojaVida } from '../../service/Adminservice'; // Asegúrate de importar correctamente tu servicio

export default {
  setup() {
    const mensajeError = ref('');
    const hojaVida = ref(null);
    const patientDocument = ref(''); // Variable para almacenar el documento del paciente
    const searchById = ref(false); // Estado del switch

    const buscarHojaVida = async () => {
      try {
        if (patientDocument.value.trim() === '') {
          console.error('Por favor, ingrese una cédula.');
          mensajeError.value = 'Por favor, ingrese una cédula.'; // Mostrar mensaje de error
          return; // Salir si el campo de búsqueda está vacío
        }

        // Limpiar la hoja de vida y el mensaje de error antes de buscar
        hojaVida.value = null;
        mensajeError.value = '';

        // Usar el servicio importado
        const datos = await obtenerHojaVida(patientDocument.value);

        // Verificar si se encontraron datos
        if (!datos) {
          mensajeError.value = 'No se encontraron datos para la cédula proporcionada.'; // Mostrar mensaje si no hay resultados
          return;
        }

        // Mapear los datos devueltos a la estructura deseada
        hojaVida.value = {
          nombre: datos['Nombre'],
          cc: datos['CC'],
          fechaCreacion: new Date(datos['Fecha Creación']).toLocaleDateString(),
          tipoUsuario: datos['Tipo Usuario'],
          estado: datos['Estado'],
          idHojaVida: datos['idHoja_Vida'],
        };

      } catch (error) {
        console.error('Error al buscar hoja de vida:', error);
        mensajeError.value = 'No se encontraron datos con esta cédula.'; // Mostrar mensaje de error
      }
    };

    return {
      patientDocument,
      searchById,
      mensajeError,
      hojaVida,
      buscarHojaVida,
    };
  },
};
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex"></div>

    <div class="flex flex-1 overflow-hidden">
      <div class="flex-1 p-10 overflow-hidden bg-gray-100">
        <div class="bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl mt-10">
          <h2 class="text-2xl font-semibold mb-6 text-blue-600">Hoja de Vida</h2>

          <!-- Switch personalizado para buscar por CC o ID -->
          <div class="mb-6">
            <div class="flex items-center">
              <span class="mr-2" :class="searchById ? 'text-gray-600' : 'text-blue-600'">CC</span>
              <input type="checkbox" class="toggle-checkbox hidden" id="searchToggleHojaVida" v-model="searchById" />
              <label for="searchToggleHojaVida" class="toggle-label cursor-pointer">
                <span class="toggle-circle" :class="searchById ? 'translate-x-5' : ''"></span>
              </label>
              <span class="ml-2" :class="searchById ? 'text-blue-600' : 'text-gray-600'">ID</span>
            </div>
          </div>

          <!-- Campo para buscar por CC o ID -->
          <div class="mb-6">
            <label class="block text-sm text-gray-600 mb-1">{{ searchById ? 'Buscar por ID' : 'Buscar por CC' }}</label>
            <div class="flex items-center space-x-2">
              <input
                type="text"
                v-model="patientDocument"
                :placeholder="searchById ? 'Ingrese el ID' : 'Ingrese el número de documento'"
                class="flex-1 p-2 border border-gray-300 rounded transition duration-300 focus:border-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              />
              <button
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-300"
                @click="buscarHojaVida"
              >
                Buscar
              </button>
            </div>
          </div>

          <!-- Mensaje de error animado -->
          <div v-if="mensajeError" class="bg-red-500 text-white p-4 rounded-md mb-4 animate-shake">
            {{ mensajeError }}
          </div>

          <!-- Información de la tabla -->
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CC</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Creación</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo Usuario</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Hoja de Vida</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actualizar</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VER</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="hojaVida">
                <td class="px-6 py-4 whitespace-nowrap">{{ hojaVida.nombre }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ hojaVida.cc }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ hojaVida.fechaCreacion }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ hojaVida.tipoUsuario }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ hojaVida.estado }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ hojaVida.idHojaVida }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button class="bg-red-600 text-white px-3 py-1 rounded">Actualizar</button>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button class="bg-blue-600 text-white px-3 py-1 rounded">VER</button>
                </td>
              </tr>
              <tr v-else>
                <td colspan="8" class="px-6 py-4 text-center">No se encontraron resultados.</td>
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

/* Animación para el mensaje de error */
.animate-shake {
  animation: shake 0.5s ease-in-out infinite;
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}
</style>
