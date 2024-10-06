<template>
  <div class="flex flex-col h-screen">
    <div class="flex-1 overflow-hidden">
      <!-- Contenido principal a la izquierda -->
      <div class="flex-1 p-10 overflow-y-auto bg-gray-100 max-h-screen">
        <!-- Asegurar que haya un límite de altura para la barra de scroll -->
        <div class="bg-white shadow-md rounded-lg p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-semibold">Hoja de Vida</h2>
            <button class="text-gray-500 hover:text-blue-600 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Información personal -->
          <div class="mb-10">
            <h3 class="text-xl font-semibold mb-4">Información Personal</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div v-for="field in personalFields" :key="field.label">
                <label class="block text-gray-700 mb-2">{{ field.label }}</label>
                <input
                  :type="field.type"
                  class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div v-for="field in personalExtraFields" :key="field.label">
                <label class="block text-gray-700 mb-2">{{ field.label }}</label>
                <input
                  :type="field.type"
                  class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              <!-- Rol -->
              <div>
                <label class="block text-gray-700 mb-2">Rol</label>
                <select class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option v-for="role in roles" :key="role">{{ role }}</option>
                </select>
              </div>
              <!-- Contacto de Emergencia -->
              <div>
                <label class="block text-gray-700 mb-2">Nombre Contacto Emergencia</label>
                <input type="text" class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-gray-700 mb-2">Parentesco</label>
                <input type="text" class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>

          <!-- Selección de Género -->
          <div class="mb-10">
            <h3 class="text-xl font-semibold mb-4">Género</h3>
            <div class="flex items-center">
              <label class="flex items-center mr-6">
                <input type="radio" v-model="gender" value="Hombre" class="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500" />
                <span class="ml-2 text-gray-700">Hombre</span>
              </label>
              <label class="flex items-center">
                <input type="radio" v-model="gender" value="Mujer" class="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500" />
                <span class="ml-2 text-gray-700">Mujer</span>
              </label>
            </div>
          </div>

          <!-- Información del Empleado -->
          <div class="mb-10">
            <h3 class="text-xl font-semibold mb-4">Datos Empleado</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div v-for="field in employeeFields" :key="field.label">
                <label class="block text-gray-700 mb-2">{{ field.label }}</label>
                <input
                  :type="field.type"
                  class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <!-- Terminación de empleado -->
          <div class="mb-10">
            <h3 class="text-xl font-semibold mb-4">Terminación Empleado</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-gray-700 mb-2">Motivo Terminación</label>
                <input type="text" class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label class="block text-gray-700 mb-2">Fecha Terminación</label>
                <input type="date" class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div class="mt-6">
              <label class="block text-gray-700 mb-2">Observaciones</label>
              <textarea class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
          </div>

          <!-- Botón de Continuar -->
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

<script>
export default {
  data() {
    return {
      personalFields: [
        { label: 'Nombres', type: 'text' },
        { label: 'Apellidos', type: 'text' },
        { label: 'Tipo de documento', type: 'text' },
        { label: 'Número de documento', type: 'text' },
        { label: 'Número de teléfono', type: 'tel' },
        { label: 'Correo electrónico', type: 'email' },
      ],
      personalExtraFields: [
        { label: 'Fecha Nacimiento', type: 'date' },
        { label: 'Dirección', type: 'text' },
        { label: 'EPS', type: 'text' },
        { label: 'Nacionalidad', type: 'text' },
        { label: 'Lugar Nacimiento', type: 'text' },
        { label: 'Alergias', type: 'text' },
        { label: 'Discapacidad', type: 'text' },
      ],
      employeeFields: [
        { label: 'Cargo', type: 'text' },
        { label: 'Tipo Contrato', type: 'text' },
        { label: 'Salario', type: 'number' },
        { label: 'Bono', type: 'number' },
        { label: 'Fecha Pago', type: 'date' },
        { label: 'Método Pago', type: 'text' },
        { label: 'Días Vacaciones', type: 'number' },
        { label: 'Días Incapacidad', type: 'number' },
        { label: 'Autorizaciones Especiales', type: 'text' },
      ],
      roles: ['Seleccione un rol', 'Médico', 'Paciente', 'Administrativo'],
      gender: '', // Variable para almacenar el género seleccionado
    };
  },
};
</script>

<style scoped>
  /* Establecer un tamaño máximo en la altura del contenido para forzar el scroll si se desborda */
  .max-h-screen {
    max-height: calc(100vh - 40px); /* Ajusta esto según el espacio que necesites */
  }
</style>
