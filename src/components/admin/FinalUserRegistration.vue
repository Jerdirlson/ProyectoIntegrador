<script setup lang="ts">
import { ref } from 'vue';

// Datos reactivas de los campos personales y de usuario
const personalFields = ref([
  { label: 'Nombres', type: 'text' },
  { label: 'Apellidos', type: 'text' },
  { label: 'Tipo de documento', type: 'text' },
  { label: 'Número de documento', type: 'text' },
  { label: 'Número de teléfono', type: 'tel' },
  { label: 'Correo electrónico', type: 'email' },
  { label: 'Dirección', type: 'text' },
]);

const userFields = ref([
  { label: 'Salario', type: 'number' },
  { label: 'Tipo Contrato', type: 'text' },
  { label: 'Bono', type: 'number' },
  { label: 'Cargo', type: 'text' },
]);

const roles = ref(['Seleccione un rol', 'Médico', 'Paciente', 'Administrativo']);
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex-1 overflow-hidden">
      <!-- Contenido principal a la izquierda -->
      <div class="flex-1 p-10 overflow-y-auto bg-gray-100 max-h-screen"> <!-- Asegurar que haya un límite de altura para la barra de scroll -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-semibold">Registro de Usuario</h2>
            <button class="text-gray-500 hover:text-blue-600 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Información personal -->
          <div class="mb-10">
            <h3 class="text-xl font-semibold mb-4">Información Personal</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="field in personalFields" :key="field.label">
                <label class="block text-gray-700 mb-2">{{ field.label }}</label>
                <input
                  :type="field.type"
                  class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-gray-700 mb-2">Rol</label>
                <select class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option v-for="role in roles" :key="role">{{ role }}</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Información del Usuario -->
          <div class="mb-10">
            <h3 class="text-xl font-semibold mb-4">Información del Usuario</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="field in userFields" :key="field.label">
                <label class="block text-gray-700 mb-2">{{ field.label }}</label>
                <input
                  :type="field.type"
                  class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all duration-300">
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Establecer un tamaño máximo en la altura del contenido para forzar el scroll si se desborda */
  .max-h-screen {
    max-height: calc(100vh - 40px); /* Ajusta esto según el espacio que necesites */
  }
</style>
