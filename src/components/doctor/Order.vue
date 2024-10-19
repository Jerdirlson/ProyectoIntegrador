<template>
  <div class="medical-order-container">
    <h2 class="title">Orden Médica</h2>

    <!-- Formulario para buscar el documento del paciente -->
    <div class="patient-document">
      <label for="document">Documento del paciente</label>
      <input type="text" id="document" v-model="patientDocument" placeholder="Ingresa el documento">
      <button class="btn-search" @click="buscarPaciente">Buscar</button>
    </div>

    <!-- Información del paciente -->
    <div class="patient-info" v-if="patientName">
      <div class="info-row">
        <span class="label">Paciente:</span>
        <span class="value">{{ patientName }}</span>
      </div>
      <div class="info-row">
        <span class="label">Orden Médica:</span>
        <div class="action-buttons">
          <button class="btn-view" @click="viewMedicalHistory">VER</button>
          <button class="btn-edit" @click="editMedicalHistory">EDITAR</button>
          <button class="btn-create" @click="createMedicalHistory">CREAR</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getUsuarioPorCC, getOrdenMedicaPorCC, getOrdenMedicaPorCCc, createOrdenMedica } from '@/service/DoctorService';
import { useRouter } from 'vue-router'; 

async function viewMedicalHistory() {
  if (patientDocument.value) {
    try {
      const pdfBlob = await getOrdenMedicaPorCCc(patientDocument.value);
      
      // Crear URL del blob y descargar
      const fileURL = window.URL.createObjectURL(pdfBlob);
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', `orden_medica_${patientDocument.value}.pdf`);
      document.body.appendChild(fileLink);
      fileLink.click();
      document.body.removeChild(fileLink);
      window.URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.error('Error al obtener la orden médica:', error);
      alert('No se pudo obtener la orden médica. Por favor, intente de nuevo.');
    }
  } else {
    alert('Por favor, ingrese el documento del paciente antes de ver la orden médica.');
  }
}

const buscarPaciente = async () => {
  try {
    const usuario = await getUsuarioPorCC(patientDocument.value);
    if (usuario) {
      patientName.value = usuario.nombreUsuario;
      const historiaClinica = await getOrdenMedicaPorCC(patientDocument.value);
      if (historiaClinica) {
        patientData.value = historiaClinica; 
      } else {
        alert('No se encontró orden medica para este paciente');
      }
    } else {
      alert('Paciente no encontrado');
    }
  } catch (error) {
    console.error(error);
  }
};

const patientDocument = ref('');
const patientName = ref('');

const patientData = ref<PatientData | null>(null);
const router = useRouter();


interface PatientData {
  idOrden_Medica: string; // O el tipo adecuado (puede ser number o cualquier otro tipo)
  // Agrega más propiedades según sea necesario
}

const editMedicalHistory = () => {
  if (patientData.value) {
    // Asumiendo que patientDocument tiene el CC del paciente
    const ccPaciente = patientDocument.value; // Asegúrate de que esto tenga el valor correcto

    router.push({
      path: '/doc/ordenE',
      query: { cc: ccPaciente } // Enviar el CC del paciente en la query
    });
  } else {
    console.error('No se encontró datos del paciente.');
  }
};

const createMedicalHistory = () => {
  if (patientDocument.value) {
    // Redirige a la vista de creación de orden médica, pasando el documento del paciente
    router.push({
      path: '/doc/ordenC',
      query: { cc: patientDocument.value } // Enviar el CC del paciente en la query
    });
  } else {
    alert('Por favor, ingrese el documento del paciente para crear una orden médica.');
  }
};

</script>

<style scoped>
.medical-order-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.75rem;
  text-align: center;
  margin-bottom: 25px;
  font-weight: bold;
  color: #007bff;
}

.patient-document {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.patient-document input {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  border-radius: 8px;
  border: 2px solid #007bff;
  font-size: 1rem;
  background-color: #f7f9fc;
}

.patient-document input:focus {
  border-color: #0056b3;
  outline: none;
}

.btn-search {
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-search:hover {
  background-color: #0056b3;
}

.patient-info {
  background-color: #f3f4f6;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #ddd;
  margin-top: 20px;
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.label {
  font-weight: bold;
  color: #333;
}

.value {
  margin-left: 10px;
  font-size: 1rem;
  color: #555;
}

.action-buttons {
  display: flex;
}

.btn-view, .btn-edit, .btn-create {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-edit {
  background-color: #17a2b8;
}

.btn-create {
  background-color: #28a745;
}

.btn-view:hover, .btn-edit:hover, .btn-create:hover {
  background-color: #0056b3;
}

.btn-edit:hover {
  background-color: #138496;
}

.btn-create:hover {
  background-color: #218838;
}
</style>
