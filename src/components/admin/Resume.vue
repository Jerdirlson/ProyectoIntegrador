<script lang="ts">
import { ref } from 'vue';
import { actualizarHojaVida, obtenerHojaVida } from '../../service/Adminservice'; // Asegúrate de importar correctamente tu servicio

export default {
  setup() {
    const mensajeError = ref('');
    const hojaVida = ref(null);
    const patientDocument = ref('');
    const searchById = ref(false);
    const modoEdicion = ref(false); // Estado para controlar si estamos en modo edición o solo visualización

    const buscarHojaVida = async () => {
      try {
        if (patientDocument.value.trim() === '') {
          mensajeError.value = 'Por favor, ingrese un número de documento o ID.';
          return;
        }

        hojaVida.value = null;
        mensajeError.value = '';

        const datos = await obtenerHojaVida(patientDocument.value, searchById.value);
        if (!datos) {
          mensajeError.value = 'No se encontraron datos para el documento proporcionado.';
          return;
        }

        hojaVida.value = {
          nombre: datos['nombreUsuario'],
          cc: datos['cc'],
          direccion: datos['direccion'],
          telefono: datos['telefonoUsuario'],
          cargo: datos['cargo'],
          salarioBasico: datos['salarioBasico'],
          idHojaVida: datos['idHoja_Vida'],
        };
      } catch (error) {
        mensajeError.value = 'No se encontraron datos con este documento o ID.';
      }
    };

    // Función para permitir editar la hoja de vida
    const activarEdicion = () => {
      modoEdicion.value = true;
    };

    // Función para actualizar la hoja de vida
    const actualizarHojaVidaDatos = async () => {
      try {
        if (!hojaVida.value) return;
        await actualizarHojaVida(hojaVida.value.idHojaVida, hojaVida.value); // Llamada a la API para actualizar
        modoEdicion.value = false;
        alert('Hoja de vida actualizada correctamente');
      } catch (error) {
        alert('Hubo un error al actualizar la hoja de vida');
      }
    };

    // Función para ver la hoja de vida sin editar
    const verHojaVida = () => {
      modoEdicion.value = false;
    };

    return {
      patientDocument,
      searchById,
      mensajeError,
      hojaVida,
      modoEdicion,
      buscarHojaVida,
      activarEdicion,
      actualizarHojaVidaDatos,
      verHojaVida,
    };
  },
};
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex"></div>
    <div class="flex-1 overflow-hidden">
      <div class="flex-1 p-10 bg-gray-100">
        <div class="bg-white shadow-lg rounded-lg p-6 mt-10">
          <h2 class="text-2xl font-semibold mb-6 text-blue-600">Hoja de Vida</h2>

          <!-- Switch para buscar por CC o ID -->
          <div class="mb-6">
            <div class="flex items-center">
              <span class="mr-2" :class="searchById ? 'text-gray-600' : 'text-blue-600'">CC</span>
              <input type="checkbox" id="searchToggleHojaVida" v-model="searchById" class="hidden" />
              <label for="searchToggleHojaVida" class="toggle-label cursor-pointer">
                <span class="toggle-circle" :class="searchById ? 'translate-x-5' : ''"></span>
              </label>
              <span class="ml-2" :class="searchById ? 'text-blue-600' : 'text-gray-600'">ID</span>
            </div>
          </div>

          <!-- Campo de búsqueda -->
          <div class="mb-6">
            <label class="block text-sm text-gray-600 mb-1">{{ searchById ? 'Buscar por ID' : 'Buscar por CC' }}</label>
            <div class="flex items-center space-x-2">
              <input
                type="text"
                v-model="patientDocument"
                :placeholder="searchById ? 'Ingrese el ID' : 'Ingrese el número de documento'"
                class="flex-1 p-2 border border-gray-300 rounded focus:border-blue-600"
              />
              <button class="px-4 py-2 bg-blue-600 text-white rounded" @click="buscarHojaVida">Buscar</button>
            </div>
          </div>

          <!-- Mensaje de error -->
          <div v-if="mensajeError" class="bg-red-500 text-white p-4 rounded-md mb-4">{{ mensajeError }}</div>

          <!-- Mostrar información de la hoja de vida -->
          <div v-if="hojaVida">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CC</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salario Básico</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Hoja de Vida</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <!-- Mostrar los campos como input solo si estamos en modo edición -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input v-if="modoEdicion" v-model="hojaVida.nombre" type="text" class="border border-gray-300 p-1 rounded w-full" />
                    <span v-else>{{ hojaVida.nombre }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ hojaVida.cc }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input v-if="modoEdicion" v-model="hojaVida.direccion" type="text" class="border border-gray-300 p-1 rounded w-full" />
                    <span v-else>{{ hojaVida.direccion }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input v-if="modoEdicion" v-model="hojaVida.telefono" type="text" class="border border-gray-300 p-1 rounded w-full" />
                    <span v-else>{{ hojaVida.telefono }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <input v-if="modoEdicion" v-model="hojaVida.cargo" type="text" class="border border-gray-300 p-1 rounded w-full" />
                    <span v-else>{{ hojaVida.cargo }}</span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ hojaVida.salarioBasico }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">{{ hojaVida.idHojaVida }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <button v-if="!modoEdicion" class="bg-red-600 text-white px-3 py-1 rounded" @click="activarEdicion">Actualizar</button>
                    <button v-else class="bg-green-600 text-white px-3 py-1 rounded" @click="actualizarHojaVidaDatos">Guardar</button>
                    <button class="bg-blue-600 text-white px-3 py-1 rounded" @click="verHojaVida">VER</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else class="text-center">No se encontraron resultados.</div>
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
</style>