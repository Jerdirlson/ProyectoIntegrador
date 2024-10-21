<template>
  <div class="patient-card">
    <div v-if="nextAppointment" class="appointment-card">
      <h3>Siguiente cita</h3>
      <br />
    </div>

    <!-- Solo mostramos la información del paciente si no es null -->
    <div class="patient-info" v-if="patient">
      <span>Paciente: {{ patient.nombreUsuario }} {{ patient.apellidoUsuario }}</span>
      <span>Género: {{ patient.sexo }}</span>
      <span>CC: {{ patient.CC }}</span>
    </div>

    <div class="medical-info" v-if="patient">
      <div class="section">
        <span>Historia Médica</span>
        <div class="buttons">
          <button class="btn red" @click="viewMedicalHistory">VER</button>
          <button class="btn red" @click="createMedicalHistory">CREAR</button>
        </div>
      </div>
      <div class="section">
        <span>Orden Médica</span>
        <div class="buttons">
          <button class="btn red" @click="viewMedicalOrder">VER</button>
          <button class="btn red" @click="navigateToCreateOrder">CREAR</button> <!-- Cambiado aquí -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'; // Importa useRouter
import { getHistoriaClinicaPorCCc, getOrdenMedicaPorCCc } from '@/service/DoctorService'; // Ajusta la ruta según tu estructura de carpetas

interface Patient {
  nombreUsuario: string;
  apellidoUsuario: string;
  sexo: string;
  CC: string;
}

const route = useRoute();
const router = useRouter(); // Crea una instancia de useRouter
const patient = ref<Patient | null>(null);
const nextAppointment = ref<Patient | null>(null);

onMounted(() => {
  const patientData = sessionStorage.getItem('patientData'); // Obtener datos de sessionStorage

  if (patientData) {
    patient.value = JSON.parse(patientData);
    console.log('Datos del paciente desde sessionStorage:', patient.value);
  } else {
    console.log('No se recibieron datos válidos del paciente.');
  }
});

const viewMedicalHistory = async () => {
  if (patient.value && patient.value.CC) {
    try {
      const pdfBlob = await getHistoriaClinicaPorCCc(patient.value.CC);
      const fileURL = window.URL.createObjectURL(pdfBlob);
      window.open(fileURL, '_blank');
      setTimeout(() => {
        window.URL.revokeObjectURL(fileURL);
      }, 100);
    } catch (error) {
      console.error('Error al obtener la historia clínica:', error);
      alert('No se pudo obtener la historia clínica. Por favor, intente de nuevo.');
    }
  } else {
    alert('Por favor, ingrese el documento del paciente antes de ver la historia clínica.');
  }
};

const createMedicalHistory = () => {
  // Redirige a la página de crear historia clínica
  if (patient.value && patient.value.CC) {
    router.push({ path: '/doc/historiaclinica', query: { cc: patient.value.CC } }); // Pasa el CC del paciente en la query
  } else {
    alert('Por favor, ingrese el documento del paciente antes de crear la historia clínica.');
  }
};

const viewMedicalOrder = async () => {
  if (patient.value && patient.value.CC) {
    try {
      const pdfBlob = await getOrdenMedicaPorCCc(patient.value.CC);
      const fileURL = window.URL.createObjectURL(pdfBlob);
      window.open(fileURL, '_blank');
      setTimeout(() => {
        window.URL.revokeObjectURL(fileURL);
      }, 100);
    } catch (error) {
      console.error('Error al obtener la orden médica:', error);
      alert('No se pudo obtener la orden médica. Por favor, intente de nuevo.');
    }
  } else {
    alert('Por favor, ingrese el documento del paciente antes de ver la orden médica.');
  }
};

// Nueva función para navegar a la página de creación de orden médica
const navigateToCreateOrder = () => {
  router.push({ name: 'ordenmedicacita', query: { cc: patient.value?.CC } }); // Cambia a la ruta de creación de orden médica
};
</script>
  
<style scoped>
.patient-card {
  background-color: #339af0;
  padding: 20px;
  border-radius: 10px;
  color: white;
  width: 100%;
  max-width: 700px;
  margin: 20px auto;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.patient-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.medical-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.buttons {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.red {
  background-color: #f03e3e;
  color: white;
}

.red:hover {
  background-color: #d63333;
}
</style>
