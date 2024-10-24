<script setup lang="ts">
import {onMounted, ref} from 'vue';
import { obtenerCitasCompletas, cancelarCitaPorId } from '@/service/Adminservice';
import Button from "@/components/Button.vue";
import {getPatient} from "@/service/PatientService";
import {useAuth} from "@/composables/UseAuth";
import router from "@/router";
import {useToast} from "@/composables/UseToast";
import {mailer} from "@/service/Mailer";

const menuOpen = ref(false);
const documento = ref('');
const citas = ref([]);
const error = ref(false);
const loading = ref(false);
const adminMode = ref(false);
const { user, checkAuth } = useAuth();


const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const createCancelAppointmentMessage = (
    patientInfo: any,
    doctor: string,
    fecha: string,
    hora: string
) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <p>Estimado/a <strong>${patientInfo.NombreCompleto}</strong>,</p>

      <p>Lamentamos informarle que su cita médica ha sido <strong>cancelada</strong> en Vitamed IPS. A continuación, encontrará los detalles de la cita cancelada:</p>

      <h3 style="border-bottom: 2px solid #ccc; padding-bottom: 5px;">INFORMACIÓN DE LA CITA CANCELADA</h3>
      <ul style="list-style: none; padding-left: 0;">
        <li><strong>Doctor(a):</strong> Dr(a). ${doctor}</li>
        <li><strong>Fecha:</strong> ${fecha}</li>
        <li><strong>Hora:</strong> ${hora}</li>
      </ul>

      <p>Si necesita agendar una nueva cita o tiene alguna pregunta, no dude en contactarnos:</p>
      <ul style="list-style: none; padding-left: 0;">
        <li><strong>Línea de atención:</strong> (123) 456-7890</li>
        <li><strong>WhatsApp:</strong> +57 300 123 4567</li>
        <li><strong>Email:</strong> citas@vitamedips.com</li>
      </ul>

      <p>¡Gracias por confiar en Vitamed IPS para el cuidado de su salud!</p>
    </div>
  `;
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
    useToast({
      title: 'Error',
      description: 'No se ha proporcionado un ID de cita válido.',
      type: 'error',
      timeoutId: 3000
    });
    return;
  }

  loading.value = true;

  try {
    const response = await cancelarCitaPorId(idCita);

    if (response) {
      const cita = citas.value.find(c => c.IdCita === idCita);
      const mensaje = createCancelAppointmentMessage(
          cita,
          cita.Doctor,
          cita.FechaHora.split(' ')[0],
          cita.FechaHora.split(' ')[1]
      );

      try {
        await mailer('Cancelación de cita médica en Vitamed IPS', cita.CorreoElectronico, mensaje);

        useToast({
          title: 'Cita cancelada',
          description: 'La cita ha sido cancelada correctamente y se ha enviado un correo electrónico de notificación.',
          type: 'success',
          timeoutId: 5000
        });

        citas.value = citas.value.filter(cita => cita.IdCita !== idCita);
      } catch (mailError) {
        console.error('Error al enviar el correo:', mailError);
        useToast({
          title: 'Cita cancelada',
          description: 'La cita ha sido cancelada, pero no se pudo enviar el correo electrónico.',
          type: 'error',
          timeoutId: 3000
        });
      }
    }
  } catch (err) {
    console.error('Error en la solicitud de cancelación:', err);
    useToast({
      title: 'Error',
      description: 'Ha ocurrido un error al cancelar la cita.',
      type: 'error',
      timeoutId: 3000
    });
  } finally {
    loading.value = false;
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
  <div class="flex flex-col h-[calc(100vh-9rem)] bg-white">
    <div class="flex flex-1 overflow-hidden">
      <div class="flex-1 p-10 overflow-y-auto">
        <div v-if="!adminMode" class="flex">
          <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all duration-300 transform hover:scale-110" @click="returnDashboardPatient">
            Volver al dashboard
          </button>
        </div>
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
