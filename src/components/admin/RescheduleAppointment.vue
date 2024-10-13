<script setup lang="ts">
import { ref } from 'vue';
import { obtenerCitasCompletas } from '../../service/Adminservice'; // Asegúrate de ajustar la ruta al archivo de servicios

// Variables reactivas
const cedula = ref(''); // Campo para la búsqueda por cédula
const cita = ref<any>(null); // Datos de la cita
const fechaActual = ref(''); // Fecha actual de la cita
const errorMensaje = ref(''); // Mensaje de error

// Función para buscar cita por cédula
const buscarCita = async () => {
  if (!cedula.value) {
    errorMensaje.value = "No existe una cita para la cedula buscada.";
    return;
  }

  try {
    // Llamada a la API para obtener la cita
    const response = await obtenerCitasCompletas(cedula.value);
    if (response && response.length > 0) {
      cita.value = response[0]; // Asignamos el primer resultado a cita
      // Actualizamos fechaActual con la fecha de la cita
      fechaActual.value = cita.value.FechaHora.slice(0, 16); // Cortamos a 16 caracteres para que coincida con el formato datetime-local
      errorMensaje.value = ''; // Limpiamos el mensaje de error
    } else {
      errorMensaje.value = "No se encontró la cita para la cédula proporcionada.";
    }
  } catch (error) {
    console.error("Error al buscar la cita:", error);
    errorMensaje.value = "No se pudo realizar la búsqueda. Inténtalo nuevamente.";
  }
};
</script>

<template>
  <div class="flex flex-col h-screen bg-gradient-to-r from-blue-50 to-blue-100">
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

          <!-- Mensaje de error -->
          <div v-if="errorMensaje" class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative animate-bounce" role="alert">
            <span class="block sm:inline">{{ errorMensaje }}</span>
          </div>

          <!-- Información de la cita -->
          <div v-if="cita" class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Información del paciente</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-600">Nombre completo</p>
                <p class="font-medium">{{ cita.NombreCompleto }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Correo electrónico</p>
                <p class="font-medium">{{ cita.CorreoElectronico }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Documento</p>
                <p class="font-medium">{{ cita.Documento }}</p>
              </div>
            </div>
          </div>

          <!-- Información de la cita -->
          <div v-if="cita" class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Información de la cita</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Fecha Actual De la Cita</label>
                <input type="datetime-local" v-model="cita.FechaHora" readonly class="w-full p-2 border border-gray-300 rounded transition duration-300 focus:border-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Nueva Fecha y Hora de la cita </label>
                <input type="datetime-local" v-model="cita.FechaHora" class="w-full p-2 border border-gray-300 rounded transition duration-300 focus:border-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              </div>
              <div>
                <p class="text-sm text-gray-600">Tipo de cita</p>
                <p class="font-medium">{{ cita.TipoCita }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Valor de la consulta</p>
                <p class="font-medium">$ {{ cita.ValorConsulta }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Doctor</p>
                <p class="font-medium">{{ cita.Doctor }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">ID Cita</p>
                <p class="font-medium">{{ cita.IdCita }}</p> 
              </div>
            </div>
          </div>

          <!-- Botón Confirmar -->
          <div v-if="cita" class="flex justify-end">
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
/* Los estilos permanecen sin cambios */
</style>

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
