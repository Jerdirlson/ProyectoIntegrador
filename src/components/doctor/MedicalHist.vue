<template>
  <div class="medical-history-container">
    <h2 class="title">Historia Médica</h2>

    <div class="patient-document">
      <label for="document">Documento del paciente</label>
      <input type="text" id="document" v-model="patientDocument" placeholder="Ingresa el documento" />
      <button class="btn-search" @click="buscarPaciente">Buscar</button> 
    </div>

    <div class="patient-info" v-if="patientName">
      <div class="info-row">
        <span class="label">Paciente:</span>
        <span class="value">{{ patientName }}</span>
      </div>
      <div class="info-row">
        <span class="label">Historia Médica:</span>
        <div class="action-buttons">
          <button class="btn-view" @click="VerHistoriaClinica">VER</button>
          <button class="btn-view" @click="editarHistoriaClinica">EDITAR</button>
          <button class="btn-create" @click="crearHistoria">CREAR</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getUsuarioPorCC, getHistoriaClinicaPorCC, getHistoriaClinicaPorCCc } from '@/service/DoctorService';
import { useRouter } from 'vue-router';

const buscarPaciente = async () => {
  try {
    const usuario = await getUsuarioPorCC(patientDocument.value);
    if (usuario) {
      patientName.value = usuario.nombreUsuario;
      const historiaClinica = await getHistoriaClinicaPorCC(patientDocument.value); 
      if (historiaClinica) {
        patientData.value = historiaClinica;
      } else {
        alert('No se encontró historia clínica para este paciente');
      }
    } else {
      alert('Paciente no encontrado');
    }
  } catch (error) {
    console.error(error);
  }
};

interface PatientData {
  idHistoria_Medica: string; 
}

const VerHistoriaClinica = async () => {
  if (patientDocument.value) {
    try {
      // Realizar la petición para obtener el PDF de la historia clínica
      const pdfBlob = await getHistoriaClinicaPorCCc(patientDocument.value);

      // Crear URL del blob y descargar el archivo PDF
      const fileURL = window.URL.createObjectURL(pdfBlob);
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', `historia_clinica_${patientDocument.value}.pdf`);
      document.body.appendChild(fileLink);
      fileLink.click();

      // Limpiar el DOM y liberar la URL creada
      document.body.removeChild(fileLink);
      window.URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.error('Error al obtener la historia clínica:', error);
      alert('No se pudo obtener la historia clínica. Por favor, intente de nuevo.');
    }
  } else {
    alert('Por favor, ingrese el documento del paciente antes de ver la historia clínica.');
  }
};


const editarHistoriaClinica = () => {
  if (patientData.value) {
    const ccPaciente = patientDocument.value; 

    router.push({
      path: '/doc/editarhistoriaclinica',
      query: { cc: ccPaciente } 
    });
  } else {
    console.error('No se encontró datos del paciente.');
  }
};

const crearHistoria = () => {
  if (patientData.value) {
    const ccPaciente = patientDocument.value; 

    router.push({
      path: '/doc/crearhistoriaclinica',
      query: { cc: ccPaciente } 
    });
  } else {
    console.error('No se encontró datos del paciente.');
  }
};

const patientData = ref<PatientData | null>(null);
const router = useRouter();

const patientDocument = ref('');
const patientName = ref('');

</script>

<style scoped>
.medical-history-container {
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
