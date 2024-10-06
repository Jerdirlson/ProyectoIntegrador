<script setup lang="ts">
import { ref } from 'vue';

// Variable reactiva
const cedula = ref(''); // Campo para la búsqueda por cédula

// Función para buscar cita por cédula
const buscarCita = () => {
  alert(`Buscando cita para cédula: ${cedula.value}`);
};
</script>

<template>
  <div class="flex flex-col h-screen bg-gradient-to-r from-blue-50 to-blue-100">
    <!-- Contenido principal -->
    <div class="flex flex-1 overflow-hidden">
      <div class="flex-1 p-10 overflow-y-auto bg-white rounded-tl-3xl shadow-xl">
        <div class="bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl mt-10 animate-fade-in">
          <h2 class="text-2xl font-semibold mb-6 text-blue-600">Re-agendar cita</h2>

          <!-- Campo de búsqueda por cédula -->
          <div class="mb-6">
            <label for="cedula" class="block text-sm font-medium text-gray-600 mb-2">Buscar cita por cédula</label>
            <div class="flex">
              <input v-model="cedula" type="text" id="cedula" placeholder="Ingrese la cédula" class="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300">
              <button @click="buscarCita" class="ml-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-transform duration-300">Buscar</button>
            </div>
          </div>

          <!-- Información del paciente -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Información del paciente</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-600">Nombre completo</p>
                <p class="font-medium">Juan David Carvajal</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Correo electrónico</p>
                <p class="font-medium">correo@ejemplo.com</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Documento</p>
                <p class="font-medium">9972406579</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Número de teléfono</p>
                <p class="font-medium">3186719838</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">EPS</p>
                <p class="font-medium">EjemploEps</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Tipo</p>
                <p class="font-medium">C.C</p>
              </div>
            </div>
          </div>

          <!-- Información de la cita -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Información de la cita</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2">
                <label class="block text-sm text-gray-600 mb-1">Fecha y Hora</label>
                <input type="date" class="w-full p-2 border border-gray-300 rounded transition duration-300 focus:border-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              </div>
              <div>
                <p class="text-sm text-gray-600">Atención</p>
                <p class="font-medium">Presencial</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Tipo de cita</p>
                <p class="font-medium">Medicina general</p>
              </div>
              <div class="col-span-2">
                <p class="text-sm text-gray-600">Doctor</p>
                <p class="font-medium">Dra. J. Santamaria</p>
              </div>
            </div>
          </div>

          <!-- Botón Confirmar -->
          <div class="flex justify-end">
            <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 animate-pulse">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animación de Bounce */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

/* Animación de Fade In */
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s forwards;
}

/* Animación de Pulso */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.animate-pulse {
  animation: pulse 1.5s infinite;
}

/* Scroll sin scrollbar visible */
.flex-1 {
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
}

.flex-1::-webkit-scrollbar {
  display: none; /* Chrome, Safari y Opera */
}
</style>
