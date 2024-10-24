<script setup lang="ts">
import {onMounted, ref} from 'vue';
import { obtenerCitasCompletas } from '@/service/Adminservice';
import axios from "axios";
import router from "@/router";
import {useAuth} from "@/composables/UseAuth";
import Button from "@/components/Button.vue";
import {useToast} from "@/composables/UseToast";
import {mailer} from "@/service/Mailer";

// Variables reactivas
const cedula = ref('');
const citas = ref([]);
const citaSeleccionada = ref<any>(null);
const errorMensaje = ref('');
const apiUrl = import.meta.env.VITE_API_URL;
const adminMode = ref(false);
const { user, checkAuth } = useAuth();

// Obtener la fecha actual en formato YYYY-MM-DD para el atributo min del input date
const fechaMinima = ref(new Date().toISOString().split('T')[0]);

const createRescheduleAppointmentMessage = (
    patientInfo: any,
    doctor: string,
    nuevaFecha: string,
    nuevaHora: string
) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <p>Estimado/a,</p>

      <p>Nos complace informarle que su cita médica ha sido <strong>re-agendada</strong> exitosamente en Vitamed IPS. A continuación, encontrará los nuevos detalles de su cita:</p>

      <h3 style="border-bottom: 2px solid #ccc; padding-bottom: 5px;">NUEVA INFORMACIÓN DE LA CITA</h3>
      <ul style="list-style: none; padding-left: 0;">
        <li><strong>Doctor(a):</strong> Dr(a). ${doctor}</li>
        <li><strong>Nueva Fecha:</strong> ${nuevaFecha}</li>
        <li><strong>Nueva Hora:</strong> ${nuevaHora}</li>
      </ul>

      <h3 style="border-bottom: 2px solid #ccc; padding-bottom: 5px;">RECOMENDACIONES IMPORTANTES</h3>
      <ul style="list-style: none; padding-left: 0;">
        <li>- Por favor, llegar 15 minutos antes de su cita</li>
        <li>- Traer documento de identidad</li>
        <li>- Traer orden médica si aplica</li>
        <li>- En caso de no poder asistir, cancelar la cita con mínimo 24 horas de anticipación</li>
      </ul>

      <p>Si necesita cancelar o reprogramar su cita nuevamente, o tiene alguna pregunta adicional, no dude en contactarnos:</p>
      <ul style="list-style: none; padding-left: 0;">
        <li><strong>Línea de atención:</strong> (123) 456-7890</li>
        <li><strong>WhatsApp:</strong> +57 300 123 4567</li>
        <li><strong>Email:</strong> citas@vitamedips.com</li>
      </ul>

      <p>¡Gracias por confiar en Vitamed IPS para el cuidado de su salud!</p>
    </div>
  `;
};

const buscarCitas = async () => {
  if (!cedula.value) {
    errorMensaje.value = "Debe ingresar una cédula para buscar.";
    return;
  }

  try {
    const response = await obtenerCitasCompletas(cedula.value);
    if (response && response.length > 0) {
      citas.value = response;
      errorMensaje.value = '';
    } else {
      errorMensaje.value = "No se encontraron citas para la cédula proporcionada.";
      citaSeleccionada.value = null;
    }
  } catch (error) {
    console.error("Error al buscar las citas:", error);
    errorMensaje.value = "No se pudo realizar la búsqueda. Inténtalo nuevamente.";
  } finally {
    setTimeout(() => {
      errorMensaje.value = '';
    }, 5000);
  }
};

const seleccionarCita = (cita) => {
  citaSeleccionada.value = { ...cita };
};

const confirmarReagendacion = async () => {
  if (!citaSeleccionada.value || !citaSeleccionada.value.IdCita || !citaSeleccionada.value.NuevaFecha || !citaSeleccionada.value.NuevaHora) {
    useToast({
      title: 'Error',
      description: 'Por favor, seleccione una cita y complete la nueva fecha y hora.',
      type : 'error',
      timeoutId: 3000
    })
    return;
  }

  try {
    const idCita = citaSeleccionada.value.IdCita;
    const nuevaFecha = citaSeleccionada.value.NuevaFecha;
    const nuevaHora = citaSeleccionada.value.NuevaHora;

    console.log('Re-agendando la cita con ID:', idCita, 'a la fecha:', nuevaFecha, 'y hora:', nuevaHora);

    const response = await axios.put(`${apiUrl}citas/cita/${idCita}`, {
      nuevaFecha: nuevaFecha,
      nuevaHora: nuevaHora
    });

    if (response.status === 200) {
      const mensaje = createRescheduleAppointmentMessage(citaSeleccionada.value, citaSeleccionada.value.Doctor, nuevaFecha, nuevaHora);

      console.log(citaSeleccionada.value)
      await mailer( 'Cita re-agendada exitosamente', citaSeleccionada.value.CorreoElectronico, mensaje);
      useToast({
        title: 'Cita re-agendada',
        description: 'La cita ha sido re-agendada correctamente. Se le enviara un correo electronico',
        type : 'success',
        timeoutId: 5000
      })
      citaSeleccionada.value = {};
    } else {
      useToast({
        title: 'Error',
        description: 'No se pudo re-agendar la cita. Inténtalo nuevamente.',
        type : 'error',
        timeoutId: 3000
      })
    }
  } catch (error) {
    console.error('Error al re-agendar la cita:', error);
    useToast({
      title: 'Error',
      description: 'No se pudo re-agendar la cita. Inténtalo nuevamente.',
      type : 'error',
      timeoutId: 3000
    })
  }
};

const returnDashboardPatient = () =>{
  router.push({name: 'dashboardpatient'});
}

onMounted(async () => {
  await checkAuth();
  if (user.value) {
    if (user.value.idRol !== 4) {
      adminMode.value = true;
    }
  }else{
    console.log('Usuario no autenticado');
  }
});
</script>

<template>
  <div class="flex flex-col h-[calc(100vh-9rem)] bg-gradient-to-r from-blue-50 to-blue-100">
    <div class="flex flex-1 overflow-hidden">
      <div class="flex-1 p-10 overflow-y-auto bg-white rounded-tl-3xl shadow-xl">
        <div v-if="!adminMode" class="flex">
          <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all duration-300 transform hover:scale-110" @click="returnDashboardPatient">
            Volver al dashboard
          </button>
        </div>
        <div class="bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl mt-10 animate-fade-in">
          <h2 class="text-2xl font-semibold mb-6 text-blue-600">Re-agendar cita</h2>

          <div class="mb-6">
            <label for="cedula" class="block text-sm font-medium text-gray-600 mb-2">Buscar citas por cédula</label>
            <div class="flex">
              <input v-model="cedula" type="text" id="cedula" placeholder="Ingrese la cédula" class="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300">
              <button @click="buscarCitas" class="ml-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-transform duration-300">Buscar</button>
            </div>
          </div>

          <div v-if="errorMensaje" class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative animate-bounce" role="alert">
            <span class="block sm:inline">{{ errorMensaje }}</span>
          </div>

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

          <div v-if="citaSeleccionada" class="mb-6">
            <h3 class="text-lg font-semibold mb-4">Re-agendar cita seleccionada</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-gray-600 mb-1">Nueva Fecha</label>
                <input
                    type="date"
                    v-model="citaSeleccionada.NuevaFecha"
                    :min="fechaMinima"
                    class="w-full p-2 border border-gray-300 rounded transition duration-300 focus:border-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              </div>
              <div>
                <label class="block text-sm text-gray-600 mb-1">Nueva Hora</label>
                <input type="time" v-model="citaSeleccionada.NuevaHora" class="w-full p-2 border border-gray-300 rounded transition duration-300 focus:border-blue-600 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              </div>
            </div>

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

.flex-1 {
  overflow-y: auto;
  scrollbar-width: none;
}

.flex-1::-webkit-scrollbar {
  display: none;
}
</style>
