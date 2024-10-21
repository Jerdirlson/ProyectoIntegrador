<script setup lang="ts">
import { ref } from 'vue';
import { obtenerCitasCompletas, cancelarCitaPorId } from '../../service/Adminservice'; // Asegúrate de que la ruta sea correcta

const menuOpen = ref(false);
const documento = ref('');
const citas = ref([]); // Almacenar todas las citas obtenidas
const error = ref(false);
const loading = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const buscarCita = async () => {
  loading.value = true;
  error.value = false;
  citas.value = [];
  try {
    const response = await obtenerCitasCompletas(documento.value);
    if (response && response.length > 0) {
      citas.value = response; // Almacenar todas las citas
    } else {
      error.value = true; // Si no hay citas encontradas
    }
  } catch (err) {
    console.error('Error al buscar las citas:', err);
    error.value = true; // En caso de error
  } finally {
    loading.value = false;
  }
};

const cancelarCita = async (idCita) => {
  if (!idCita) {
    alert("No hay cita seleccionada.");
    return;
  }

  console.log('Cancelando la cita con ID:', idCita);
  loading.value = true;

  try {
    // Llamar a la función para cancelar la cita
    const response = await cancelarCitaPorId(idCita);

    // Verificar la respuesta
    if (response) {
      alert("Cita cancelada exitosamente.");
      // Remover la cita cancelada de la lista de citas
      citas.value = citas.value.filter(cita => cita.IdCita !== idCita);
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

            <template v-if="citas.length > 0">
              <div class="mb-4">
                <h3 class="font-semibold text-xl text-gray-800 mb-2">Citas encontradas:</h3>
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
                      <p>Valor: <span class="font-semibold text-blue-600">${{ cita.ValorConsulta }}</span></p>
                      <p>Doctor: <span class="font-semibold text-blue-600">{{ cita.Doctor }}</span></p>
                    </div>

                    <button
                        class="bg-red-600 text-white py-2 px-4 rounded mt-4 hover:bg-red-500 transition duration-300 transform hover:scale-105"
                        @click="cancelarCita(cita.IdCita)"
                    >
                      Cancelar esta cita
                    </button>
                  </li>
                </ul>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
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
