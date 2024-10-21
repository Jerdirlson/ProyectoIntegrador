<script setup lang="ts">
import { ref } from 'vue';
import { obtenerCitasCompletas } from '../../service/Adminservice';
import axios from "axios"; // Asegúrate de ajustar la ruta al archivo de servicios

// Variables reactivas
const cedula = ref(''); // Campo para la búsqueda por cédula
const citas = ref([]); // Almacenar todas las citas
const citaSeleccionada = ref<any>(null); // Cita seleccionada por el usuario para re-agendar
const errorMensaje = ref(''); // Mensaje de error
const apiUrl = import.meta.env.VITE_API_URL;

// Función para buscar citas por cédula
const buscarCitas = async () => {
  if (!cedula.value) {
    errorMensaje.value = "Debe ingresar una cédula para buscar.";
    return;
  }

  try {
    // Llamada a la API para obtener las citas
    const response = await obtenerCitasCompletas(cedula.value);
    if (response && response.length > 0) {
      citas.value = response; // Asignar todas las citas encontradas
      errorMensaje.value = ''; // Limpiar el mensaje de error
    } else {
      errorMensaje.value = "No se encontraron citas para la cédula proporcionada.";
      citas.value = []; // Limpiar las citas si no se encuentra nada
    }
  } catch (error) {
    console.error("Error al buscar las citas:", error);
    errorMensaje.value = "No se pudo realizar la búsqueda. Inténtalo nuevamente.";
  }
};

// Función para seleccionar una cita para re-agendar
const seleccionarCita = (cita) => {
  citaSeleccionada.value = { ...cita }; // Crear una copia de la cita seleccionada
};

const confirmarReagendacion = async () => {
  if (!citaSeleccionada.value || !citaSeleccionada.value.IdCita || !citaSeleccionada.value.NuevaFecha || !citaSeleccionada.value.NuevaHora) {
    alert('Faltan datos para re-agendar la cita.');
    return;
  }

  try {
    const idCita = citaSeleccionada.value.IdCita;
    const nuevaFecha = citaSeleccionada.value.NuevaFecha; // Nueva fecha
    const nuevaHora = citaSeleccionada.value.NuevaHora;   // Nueva hora

    console.log('Re-agendando la cita con ID:', idCita, 'a la fecha:', nuevaFecha, 'y hora:', nuevaHora);

    // Realizar la solicitud PUT al backend enviando la fecha y la hora por separado
    const response = await axios.put(`${apiUrl}citas/cita/${idCita}`, {
      nuevaFecha: nuevaFecha,
      nuevaHora: nuevaHora
    });

    if (response.status === 200) {
      alert('Cita re-agendada exitosamente');
      // Aquí puedes realizar acciones adicionales como limpiar el formulario o actualizar la lista de citas
    } else {
      alert('Error al re-agendar la cita');
    }
  } catch (error) {
    console.error('Error al re-agendar la cita:', error);
    alert('Error en el proceso de re-agendación');
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
            <label for="cedula" class="block text-sm font-medium text-gray-600 mb-2">Buscar citas por cédula</label>
            <div class="flex">
              <input v-model="cedula" type="text" id="cedula" placeholder="Ingrese la cédula" class="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300">
              <button @click="buscarCitas" class="ml-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-transform duration-300">Buscar</button>
            </div>
          </div>

          <!-- Mensaje de error -->
          <div v-if="errorMensaje" class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative animate-bounce" role="alert">
            <span class="block sm:inline">{{ errorMensaje }}</span>
          </div>

          <!-- Lista de citas -->
          <div v-if="citas.length > 0" class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Citas encontradas</h3>
            <ul>
              <li v-for="cita in citas" :key="cita.IdCita" class="mb-4 p-4 border border-gray-300 rounded-lg shadow-md bg-blue-50">
                <div class="mb-2">
                  <p class="font-semibold text-gray-800">Paciente: <span class="text-blue-600">{{ cita.NombreCompleto }}</span></p>
                  <p class="font-semibold text-gray-800">Correo: <span class="text-blue-600">{{ cita.CorreoElectronico }}</span></p>
                  <p class="font-semibold text-gray-800">Documento: <span class="text-blue-600">{{ cita.Documento }}</span></p>
                </div>
                <div>
                  <p class="font-semibold text-gray-800">ID Cita: <span class="text-blue-600">{{ cita.IdCita }}</span></p>
                  <p>Hora: <span class="font-semibold text-blue-600">{{ cita.FechaHora }}</span></p>
                  <p>Tipo de Cita: <span class="font-semibold text-blue-600">{{ cita.TipoCita }}</span></p>
                  <p>Doctor: <span class="font-semibold text-blue-600">{{ cita.Doctor }}</span></p>
                </div>
                <button @click="seleccionarCita(cita)" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-300 transform hover:scale-105">
                  Re-agendar esta cita
                </button>
              </li>
            </ul>
          </div>

          <!-- Re-agendar la cita seleccionada -->
          <div v-if="citaSeleccionada" class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Re-agendar cita seleccionada</h3>
            <div class="grid grid-cols-2 gap-4">
              <!-- Input para la nueva fecha -->
              <div>
                <label class="block text-sm text-gray-600 mb-1">Nueva Fecha</label>
                <input type="date" v-model="citaSeleccionada.NuevaFecha" class="w-full p-2 border border-gray-300 rounded transition duration-300 focus:border-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              </div>
              <!-- Input para la nueva hora -->
              <div>
                <label class="block text-sm text-gray-600 mb-1">Nueva Hora</label>
                <input type="time" v-model="citaSeleccionada.NuevaHora" class="w-full p-2 border border-gray-300 rounded transition duration-300 focus:border-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              </div>
            </div>

            <!-- Botón Confirmar Re-agendación -->
            <div class="flex justify-end mt-4">
              <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 animate-pulse" @click="confirmarReagendacion">
                Confirmar Re-agendación
              </button>
            </div>
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
