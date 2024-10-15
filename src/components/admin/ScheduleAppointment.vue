
<script setup lang="ts">
import { ref } from 'vue';
import { obtenerDoctorPorCedula } from '../../service/Adminservice'; // Ajusta la ruta según corresponda

const menuOpen = ref(false);
const isAttention = ref(true); // Inicialmente en true para atención presencial
const doctorDocument = ref(''); // Para almacenar el número de cédula del doctor
const doctorInfo = ref<any | null>(null); // Información del doctor
const patientDocument = ref(''); // Para almacenar el número de documento del paciente

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const salir = () => {
  setTimeout(() => {
    // Lógica adicional para salir o redirigir
  }, 500); // Ajusta el tiempo para la duración de la animación
};

const confirmarCita = () => {
  console.log(`Confirmando cita para el documento: ${patientDocument.value}`);
};

const buscarDoctor = async () => {
  try {
    const response = await obtenerDoctorPorCedula(doctorDocument.value);
    doctorInfo.value = response[0]; // Asigna la primera entrada del array JSON a doctorInfo
  } catch (error) {
    console.error('Error al buscar doctor:', error);
    doctorInfo.value = null; // Restablece la información del doctor en caso de error
  }
};
</script>


<template>
  <div class="flex flex-col h-screen">
    <!-- Contenedor para los banners -->
    <div class="flex"></div>

    <div class="flex flex-1 overflow-hidden">
      <!-- Contenido principal a la izquierda -->
      <div class="flex-1 p-10 overflow-y-auto bg-gray-100">
        <div class="bg-white shadow-lg rounded-lg p-6 mt-10">
          <h2 class="text-2xl font-semibold mb-6 text-blue-600">Agendar cita</h2>

          <!-- Campo para ingresar cédula y botón de búsqueda -->
          <div class="mb-6 flex items-center space-x-2">
            <input
              type="text"
              v-model="doctorDocument"
              placeholder="Ingrese el número de cédula del doctor"
              class="w-full p-2 border border-gray-300 rounded focus:border-blue-600"
            />
            <button
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
              @click="buscarDoctor"
            >
              Buscar
            </button>
          </div>

          <!-- Información del Doctor -->
          <div v-if="doctorInfo" class="bg-gray-100 p-4 rounded shadow-lg mb-6">
            <h3 class="text-lg font-semibold mb-4">Información del Doctor</h3>
            <p><strong>ID del Doctor:</strong> {{ doctorInfo.idDoctor }}</p>
            <p><strong>Nombre Completo:</strong> {{ doctorInfo.NombreCompleto }}</p>
            <p><strong>Correo Electrónico:</strong> {{ doctorInfo.CorreoElectronico }}</p>
            <p><strong>Documento:</strong> {{ doctorInfo.Documento }}</p>
            <p><strong>Especialidad:</strong> {{ doctorInfo.Especialidad }}</p>
          </div>

          <!-- Mensaje en caso de que no se encuentre información -->
          <div v-else-if="doctorDocument.length > 0" class="text-red-500 mb-6">
            <p>No se encontró información para el número de cédula ingresado.</p>
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
            </div>
          </div>

          <!-- Información del paciente -->
          <div class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Información del paciente</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Nombres</label>
                <input type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Juan David" />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Apellidos</label>
                <input type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="Patiño Parra" />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Tipo de documento</label>
                <select class="w-full p-2 border border-gray-300 rounded">
                  <option>C.C</option>
                </select>
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Número de documento</label>
                <input type="text" class="w-full p-2 border border-gray-300 rounded" placeholder="937240679" />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Correo electrónico</label>
                <input type="email" class="w-full p-2 border border-gray-300 rounded" placeholder="correoEjemplo_4321@gmail.com" />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Número de teléfono</label>
                <input type="tel" class="w-full p-2 border border-gray-300 rounded" placeholder="3100098946" />
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all duration-300 transform hover:scale-110" @click="confirmarCita">
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

input:focus {
  outline: none;
  border-color: #2563eb;
}
</style>
