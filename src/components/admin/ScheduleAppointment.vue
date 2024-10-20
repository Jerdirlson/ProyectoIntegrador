
<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import {useAuth} from "@/composables/UseAuth";
import type {userType} from "@/types/loginType";
import {useToast} from "@/composables/UseToast";
import {getPatient} from "@/service/PatientService";


const menuOpen = ref(false);
const isAttention = ref(true);
const patientDocument = ref('');
const patientInfo = ref<userType | null>(null);
const mostrarError = ref(false);
const fechaHora = ref<string>('');
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
const adminMode = ref(false);
const { user, checkAuth } = useAuth();

const confirmarCita = () => {
  console.log(`Confirmando cita para el documento: ${patientDocument.value}`);
};

const getInfoPatient = async () => {
 try {
    const response = await getPatient(patientDocument.value);
    console.log('Información del paciente:', response);
    patientInfo.value = response;
 } catch (error) {
   console.error('Error al obtener la información del paciente:', error);
   mostrarError.value = true;
   setTimeout(() => {
     mostrarError.value = false;
   }, 4000)
 }
};


onMounted(async () => {
  await checkAuth();
  if (user.value) {
    if (user.value.idRol !== 4) {
      console.log('usuario autorizado:');
      adminMode.value = true;
    } else {
      patientInfo.value = await getPatient(user.value.CC.toString());
    }
  }else{
    console.log('Usuario no autenticado');
  }
});

watch(fechaHora, (newVal) => {
  console.log('Nueva fecha y hora:', newVal);
});

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
          <div v-if="adminMode" class="mb-6 flex items-center space-x-2">
            <input
              type="text"
              v-model="patientDocument"
              placeholder="Ingrese el número de cédula del paciente"
              class="w-full p-2 border border-gray-300 rounded focus:border-blue-600"
            />
            <button
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
              @click="getInfoPatient"
            >
              Buscar
            </button>
          </div>

          <!-- Mensaje en caso de que no se encuentre información -->
          <div v-if="mostrarError" class="text-red-500 mb-6">
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
                  v-model="fechaHora"
                  class="w-full p-2 border border-gray-300 rounded transition duration-300 focus:border-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                />
              </div>
            </div>
          </div>

          <div v-if='patientInfo' class="flex flex-col mb-6">
            <h3 class="text-lg font-semibold mb-4">Información del paciente</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Nombres</label>
                <input type="text" class="w-full p-2 border border-gray-300 rounded" disabled :placeholder="patientInfo.nombreUsuario" />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Apellidos</label>
                <input type="text" class="w-full p-2 border border-gray-300 rounded" disabled :placeholder="patientInfo.apellidoUsuario" />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Tipo de documento</label>
                <select class="w-full p-2 border border-gray-300 rounded">
                  <option>C.C</option>
                </select>
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Número de documento</label>
                <input type="text" class="w-full p-2 border border-gray-300 rounded" disabled :placeholder="patientInfo.CC" />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Correo electrónico</label>
                <input type="email" class="w-full p-2 border border-gray-300 rounded" disabled :placeholder="patientInfo.emailUsuario" />
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Número de teléfono</label>
                <input type="tel" class="w-full p-2 border border-gray-300 rounded" disabled placeholder="3100098946" />
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
