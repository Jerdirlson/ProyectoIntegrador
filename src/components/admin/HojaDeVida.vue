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
                @click="buscarCita"
              >
                Buscar
              </button>
            </div>
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
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actualizar</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VER</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(invoice, index) in invoices" :key="index">
                <td class="px-6 py-4 whitespace-nowrap">{{ invoice.nombre }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ invoice.cc }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ invoice.fechaCreacion }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ invoice.tipoUsuario }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ invoice.estado }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button class="bg-red-600 text-white px-3 py-1 rounded">Actualizar</button>
                </td>
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

<script>
export default {
  data() {
    return {
      patientDocument: '',
      searchById: false, // Estado del switch
      invoices: [
        { nombre: 'Juan David Muñoz', cc: '1253355', fechaCreacion: '24/05/2024', tipoUsuario: 'Paciente', estado: 'Activo' },
        { nombre: 'Sergio Mesa', cc: '1253356', fechaCreacion: '24/05/2024', tipoUsuario: 'Paciente', estado: 'Activo' },
        { nombre: 'Fernando Vega', cc: '1253357', fechaCreacion: '24/05/2024', tipoUsuario: 'Paciente', estado: 'Activo' },
        { nombre: 'Alex Montaflez', cc: '1253358', fechaCreacion: '24/05/2024', tipoUsuario: 'Paciente', estado: 'Inactivo' },
      ],
    };
  },
  methods: {
    buscarCita() {
      console.log(`Buscando cita para el ${this.searchById ? 'ID' : 'documento'}: ${this.patientDocument}`);
      // Implementa la lógica de búsqueda aquí
    },
  },
};
</script>

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
