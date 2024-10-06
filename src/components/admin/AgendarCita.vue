<script>
export default {
  data() {
    return {
      menuOpen: false,
      isAttention: true, // Inicialmente se establece en true para atención presencial
      isSpecialist: false, // Inicialmente se establece en false para no mostrar búsqueda de especialista
      patientDocument: '', // Para almacenar el número de documento del paciente
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    salir() {
      // Lógica para la acción de salir
      setTimeout(() => {
        // Lógica adicional para salir o redirigir
      }, 500); // Ajusta el tiempo para la duración de la animación
    },
    buscarCita() {
      // Lógica para buscar la cita por cédula
      console.log(`Buscando cita para el documento: ${this.patientDocument}`);
    },
  },
};
</script>

<template>
  <div class="flex flex-col h-screen">
    <!-- Contenedor para los banners -->
    <div class="flex"></div>

    <div class="flex flex-1 overflow-hidden">
      <!-- Contenido principal a la izquierda -->
      <div class="flex-1 p-10 overflow-y-auto bg-gray-100">
        <div class="bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl mt-10">
          <h2 class="text-2xl font-semibold mb-6 text-blue-600">Re-agendar cita</h2>

          <!-- Campo para buscar cita por cédula -->
          <div class="mb-6">
            <label class="block text-sm text-gray-600 mb-1">Buscar cita por cédula</label>
            <div class="flex items-center space-x-2">
              <input
                type="text"
                v-model="patientDocument"
                placeholder="Ingrese el número de documento"
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

          <!-- Información de la cita -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Información de la cita</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Forma de atención</label>
                <div class="flex items-center">
                  <span class="mr-2" :class="isAttention ? 'text-blue-600' : 'text-gray-600'">{{ isAttention ? 'Presencial' : 'Domiciliaria' }}</span>
                  <input type="checkbox" class="toggle-checkbox hidden" id="attentionToggle" v-model="isAttention" />
                  <label for="attentionToggle" class="toggle-label cursor-pointer">
                    <span class="toggle-circle" :class="isAttention ? 'translate-x-5' : ''"></span>
                  </label>
                </div>
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Fecha y Hora</label>
                <input
                  type="date"
                  class="w-full p-2 border border-gray-300 rounded transition duration-300 focus:border-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Seleccionar especialista</label>
                <div class="flex items-center">
                  <span class="mr-2" :class="isSpecialist ? 'text-blue-600' : 'text-gray-600'">{{ isSpecialist ? 'SI' : 'NO' }}</span>
                  <input type="checkbox" class="toggle-checkbox hidden" id="specialistToggle" v-model="isSpecialist" />
                  <label for="specialistToggle" class="toggle-label cursor-pointer">
                    <span class="toggle-circle" :class="isSpecialist ? 'translate-x-5' : ''"></span>
                  </label>
                </div>
                <div v-if="isSpecialist" class="flex items-center space-x-2 mt-2">
                  <input
                    type="text"
                    placeholder="Buscar especialista..."
                    class="p-2 border border-gray-300 rounded transition duration-300 focus:border-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  />
                  <button class="px-3 py-1 bg-blue-600 text-white rounded">Buscar</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Campos adicionales para domicilio -->
          <div v-if="!isAttention" class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Información de domicilio</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Barrio</label>
                <input
                  type="text"
                  class="w-full p-2 border border-gray-300 rounded"
                  placeholder="Palermo"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Dirección</label>
                <input
                  type="text"
                  class="w-full p-2 border border-gray-300 rounded"
                  placeholder="Calle 3A #30-21"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Información adicional</label>
                <input
                  type="text"
                  class="w-full p-2 border border-gray-300 rounded"
                  placeholder="Casa 5FC, Piso 2"
                />
              </div>
            </div>
          </div>

          <!-- Información del paciente -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Información del paciente</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Nombres</label>
                <input
                  type="text"
                  class="w-full p-2 border border-gray-300 rounded"
                  placeholder="Juan David"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Apellidos</label>
                <input
                  type="text"
                  class="w-full p-2 border border-gray-300 rounded"
                  placeholder="Patiño Parra"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Tipo de documento</label>
                <select class="w-full p-2 border border-gray-300 rounded">
                  <option>C.C</option>
                  <!-- Agregar más opciones según sea necesario -->
                </select>
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Número de documento</label>
                <input
                  type="text"
                  class="w-full p-2 border border-gray-300 rounded"
                  placeholder="937240679"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Correo electrónico</label>
                <input
                  type="email"
                  class="w-full p-2 border border-gray-300 rounded"
                  placeholder="correoEjemplo_4321@gmail.com"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Número de teléfono</label>
                <input
                  type="tel"
                  class="w-full p-2 border border-gray-300 rounded"
                  placeholder="3100098946"
                />
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all duration-300 transform hover:scale-110">
              Confirmar
            </button>
          </div>
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
