<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getHistoriaClinicaPorCC } from '@/service/DoctorService';
import { useRoute, useRouter } from 'vue-router'; 

const idHistoria_Medica = ref('');
const tipoSangre = ref('');
const genero = ref('');
const fecha_Nac = ref('');
const discapacidad = ref('');
const fecha_Rev = ref('');
const hora_Rev = ref('');
const motivo = ref('');
const descripcion_Motivo = ref('');
const presion_Sangre = ref('');
const presion_Sangre_Prom = ref('');
const pulso = ref('');
const saturacion = ref('');
const altura = ref('');
const peso = ref('');
const perinatales = ref('');
const patologicos = ref('');
const quirurgicos = ref('');
const vacunas = ref('');
const familiares = ref('');
const conclusion = ref('');
const diagnostico = ref('');
const tratamiento = ref('');
const firma_digital_doctor = ref('');
const router = useRouter();

const route = useRoute();

const cargarHistoriaMedica = async () => {
  const ccPaciente = route.query.cc; // Obtener el CC del paciente desde la query
  if (typeof ccPaciente === 'string' || typeof ccPaciente === 'number') {
    try {
      // Llamar al servicio con el CC del paciente
      const historiaClinica = await getHistoriaClinicaPorCC(ccPaciente); 

      if (historiaClinica) {
        // Guardar el idHistoria_Medica
        idHistoria_Medica.value = historiaClinica.idHistoria_Medica;

        // Asignar los valores del objeto historiaClinica a las variables reactivas
        tipoSangre.value = historiaClinica.tipoSangre || '';
        genero.value = historiaClinica.genero || '';
        fecha_Nac.value = historiaClinica.fecha_Nac
          ? new Date(historiaClinica.fecha_Nac).toISOString().split('T')[0]
          : '';
        discapacidad.value = historiaClinica.discapacidad || '';
        fecha_Rev.value = historiaClinica.fecha_Rev
          ? new Date(historiaClinica.fecha_Rev).toISOString().split('T')[0]
          : '';
        hora_Rev.value = historiaClinica.hora_Rev || '';
        motivo.value = historiaClinica.motivo || '';
        descripcion_Motivo.value = historiaClinica.descripcion_Motivo || '';
        presion_Sangre.value = historiaClinica.presion_Sangre || '';
        presion_Sangre_Prom.value = historiaClinica.presion_Sangre_Prom || '';
        pulso.value = historiaClinica.pulso || '';
        saturacion.value = historiaClinica.saturacion || '';
        altura.value = historiaClinica.altura || '';
        peso.value = historiaClinica.peso || '';
        perinatales.value = historiaClinica.perinatales || '';
        patologicos.value = historiaClinica.patologicos || '';
        quirurgicos.value = historiaClinica.quirurgicos || '';
        vacunas.value = historiaClinica.vacunas || '';
        familiares.value = historiaClinica.familiares || '';
        conclusion.value = historiaClinica.conclusion || '';
        diagnostico.value = historiaClinica.diagnostico || '';
        tratamiento.value = historiaClinica.tratamiento || '';
        firma_digital_doctor.value = historiaClinica.firma_digital_doctor || '';
      } else {
        console.error('No se encontró la historia clínica');
      }
    } catch (error) {
      console.error('Error al cargar la historia clínica:', error);
    }
  } else {
    console.error('CC de paciente inválido:', ccPaciente);
  }
};

onMounted(() => {
  cargarHistoriaMedica();
});

const navigateBack = () => {
  router.push('/doc/docinfo'); // Cambia '/ruta/deseada' por la ruta a la que quieres ir
};

</script>

<template>
  <div class="form-container">
    <form class="styled-form">
      <h2>Historia Médica</h2>

      <div class="form-row">
        <div class="form-group">
          <label>Tipo de Sangre:</label>
          <input v-model="tipoSangre" type="text" readonly />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Género:</label>
          <input v-model="genero" type="text" readonly />
        </div>
        <div class="form-group">
          <label>Fecha de Nacimiento:</label>
          <input v-model="fecha_Nac" type="date" readonly />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Discapacidad:</label>
          <input v-model="discapacidad" type="text" readonly />
        </div>
        <div class="form-group">
          <label>Fecha de Revisión:</label>
          <input v-model="fecha_Rev" type="date" readonly />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Hora de Revisión:</label>
          <input v-model="hora_Rev" type="time" readonly />
        </div>
        <div class="form-group">
          <label>Motivo:</label>
          <input v-model="motivo" type="text" readonly />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Descripción del Motivo:</label>
          <textarea v-model="descripcion_Motivo" readonly></textarea>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Presión Sanguínea:</label>
          <input v-model="presion_Sangre" type="text" readonly />
        </div>
        <div class="form-group">
          <label>Presión Sanguínea Promedio:</label>
          <input v-model="presion_Sangre_Prom" type="text" readonly />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Pulso:</label>
          <input v-model="pulso" type="text" readonly />
        </div>
        <div class="form-group">
          <label>Saturación:</label>
          <input v-model="saturacion" type="text" readonly />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Altura:</label>
          <input v-model="altura" type="text" readonly />
        </div>
        <div class="form-group">
          <label>Peso:</label>
          <input v-model="peso" type="text" readonly />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Perinatales:</label>
          <textarea v-model="perinatales" readonly></textarea>
        </div>
        <div class="form-group">
          <label>Patológicos:</label>
          <textarea v-model="patologicos" readonly></textarea>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Quirúrgicos:</label>
          <textarea v-model="quirurgicos" readonly></textarea>
        </div>
        <div class="form-group">
          <label>Vacunas:</label>
          <textarea v-model="vacunas" readonly></textarea>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Familiares:</label>
          <textarea v-model="familiares" readonly></textarea>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Conclusión:</label>
          <textarea v-model="conclusion" readonly></textarea>
        </div>
        <div class="form-group">
          <label>Diagnóstico:</label>
          <textarea v-model="diagnostico" readonly></textarea>
        </div>
        <div class="form-group">
          <label>Tratamiento:</label>
          <textarea v-model="tratamiento" readonly></textarea>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Firma Digital Doctor:</label>
          <input v-model="firma_digital_doctor" type="text" readonly />
        </div>
      </div>
      <button type="button" class="back-button" @click="navigateBack">Volver</button>
    </form>
  </div>
</template>

<style scoped>

.back-button {
  display: block;
  margin: 20px auto 0; 
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  height: calc(100vh - 120px);
  background-color: #f0f4f8;
  overflow-y: auto;
}

.styled-form {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  width: 100%;
}

.styled-form h2 {
  color: #007bff;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: bold;
  font-size: 2rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border-radius: 5px;
  border: 2px solid #007bff; /* Borde más prominente */
  background-color: #f7f9fc; /* Color de fondo para los cuadros de entrada */
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s ease; /* Efecto al enfocarse */
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #0056b3; /* Cambio de color en el enfoque */
  outline: none; /* Quitar el borde de enfoque predeterminado */
}

.form-group textarea {
  resize: vertical;
  min-height: 100px; /* Altura mínima para áreas de texto */
}

.submit-button {
  display: block;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
