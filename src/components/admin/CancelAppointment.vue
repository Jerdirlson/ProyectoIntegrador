}<script setup lang="ts">
import { ref } from 'vue';
import { obtenerCitasCompletas, cancelarCitaPorId } from '../../service/Adminservice'; // Asegúrate de que la ruta sea correcta

const menuOpen = ref(false);
const documento = ref('');
const pacienteInfo = ref(null);
const error = ref(false);
const loading = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const buscarCita = async () => {
  loading.value = true;
  error.value = false;
  try {
    const response = await obtenerCitasCompletas(documento.value);
    if (response && response.length > 0) {
      pacienteInfo.value = response[0]; // Asumimos que queremos la primera cita
    } else {
      error.value = true; // Si no hay citas encontradas
      pacienteInfo.value = null;
    }
  } catch (err) {
    console.error('Error al buscar la cita:', err);
    error.value = true; // En caso de error
  } finally {
    loading.value = false;
  }
};



const cancelarCita = async () => {
  if (!pacienteInfo.value || !pacienteInfo.value.IdCita) {
    alert("No hay cita seleccionada.");
    return;
  }

  const idCita = pacienteInfo.value.IdCita; // Obtener el ID de la cita
  console.log('Cancelando la cita con ID:', idCita);
  loading.value = true;

  try {
    // Llamar a la función para cancelar la cita
    const response = await cancelarCitaPorId(idCita); 

    // Verificar la respuesta
    if (response) {
      alert("Cita cancelada exitosamente.");
      pacienteInfo.value = null; // Limpiar la información del paciente
    }
  } catch (err) {
    console.error('Error en la solicitud de cancelación:', err);
    alert("Error en la solicitud de cancelación.");
  } finally {
    loading.value = false;
  }
};

</script>

<template>
  <div class="flex flex-col h-screen bg-white">
    <div class="flex flex-1 overflow-hidden">
      <div class="flex-1 p-10 overflow-y-auto">
        <div class="bg-white shadow-lg rounded-lg p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl mt-10 animate-fade-in">
          <div class="flex justify-center mb-6">
            <h2 class="text-4xl font-bold text-blue-600">Cancelar Cita</h2>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-lg mx-auto w-full max-w-lg">
            <div class="flex items-center mb-4">
              <label class="block text-gray-700 font-semibold" for="documento">Número de documento</label>
              <input
                type="text"
                v-model="documento"
                id="documento"
                placeholder="Ingrese el número de documento"
                class="border border-gray-300 rounded-md p-3 w-full ml-2 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                class="bg-blue-600 text-white py-2 px-4 rounded ml-2 hover:bg-blue-500 transition duration-300 transform hover:scale-105"
                @click="buscarCita"
              >
                Buscar
              </button>
            </div>

            <template v-if="loading">
              <div class="flex justify-center mb-4">
                <div class="animate-spin h-5 w-5 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                <p class="ml-2">Cargando...</p>
              </div>
            </template>

            <template v-if="error">
              <p class="mb-4 font-semibold text-lg text-red-600">No se encontraron citas para este documento.</p>
            </template>

            <template v-if="pacienteInfo">
              <div class="mb-4 p-4 border border-gray-300 rounded-lg shadow-md bg-blue-50">
                <div class="mb-4">
                  <p class="font-semibold text-gray-800"><strong>Información Paciente:</strong></p>
                  <p class="font-semibold text-gray-800">Paciente: <span class="text-blue-600">{{ pacienteInfo.NombreCompleto }}</span></p>
                  <p class="font-semibold text-gray-800">Correo: <span class="text-blue-600">{{ pacienteInfo.CorreoElectronico }}</span></p>
                  <p class="font-semibold text-gray-800">Documento: <span class="text-blue-600">{{ pacienteInfo.Documento }}</span></p>
                </div>
                <div>
                  <p class="font-semibold text-gray-800"><strong>Información de la cita:</strong></p>
                  <p class="font-semibold text-gray-800">ID Cita: <span class="text-blue-600">{{ pacienteInfo.IdCita }}</span></p>
                  <p>Hora: <span class="font-semibold text-blue-600">{{ pacienteInfo.FechaHora }}</span></p>
                  <p>Tipo de Cita: <span class="font-semibold text-blue-600">{{ pacienteInfo.TipoCita }}</span></p>
                  <p>Valor: <span class="font-semibold text-blue-600">${{ pacienteInfo.ValorConsulta }}</span></p>
                  <p>Doctor: <span class="font-semibold text-blue-600">{{ pacienteInfo.Doctor }}</span></p>
                </div>
              </div>

              <button
                class="bg-red-600 text-white py-3 px-6 rounded w-full hover:bg-red-500 transition duration-300 transform hover:scale-105"
                @click="cancelarCita"
              >
                Cancelar cita
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <button
      class="lg:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-4 rounded-full focus:outline-none transition-all duration-300 hover:bg-blue-500 hover:scale-110"
      @click="cancelarCita"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
      Cancelar cita
    </button>
  </div>
</template>

<style scoped>
/* Animación para el cuadro de "Cancelar Cita" */
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

/* Animación para el spinner de carga */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
