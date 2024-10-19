<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getOrdenMedicaPorCC } from '@/service/DoctorService'; 
import { useRoute, useRouter } from 'vue-router'; 

const idOrden_Medica = ref('');
const idCita = ref('');
const estadoOM = ref('');
const fecha = ref('');
const diagnostico = ref('');
const ordenes = ref('');
const recomendaciones = ref('');
const route = useRoute();
const router = useRouter();

const cargarOrdenMedica = async () => {
  const ccPaciente = route.query.cc; 
  if (typeof ccPaciente === 'string' || typeof ccPaciente === 'number') {
    try {
      const ordenMedica = await getOrdenMedicaPorCC(ccPaciente); 

      if (ordenMedica) {
        idOrden_Medica.value = ordenMedica.idOrden_Medica || '';
        idCita.value = ordenMedica.idCita || '';
        estadoOM.value = ordenMedica.estadoOM || '';
        fecha.value = ordenMedica.fecha ? new Date(ordenMedica.fecha).toISOString().split('T')[0] : '';
        diagnostico.value = ordenMedica.diagnostico || '';
        ordenes.value = ordenMedica.ordenes || '';
        recomendaciones.value = ordenMedica.recomendaciones || '';
      } else {
        console.error('No se encontró la orden médica');
      }
    } catch (error) {
      console.error('Error al cargar la orden médica:', error);
    }
  } else {
    console.error('CC de paciente inválido:', ccPaciente);
  }
};

onMounted(() => {
  cargarOrdenMedica();
});

const navigateBack = () => {
  router.push('/doc/docinfo'); // Cambia '/ruta/deseada' por la ruta a la que quieres ir
};

</script>

<template>
  <div class="form-container">
    <form class="styled-form">
      <h2>Orden Médica</h2>

      <div class="form-row">
        <div class="form-group">
          <label>ID Orden Médica:</label>
          <input v-model="idOrden_Medica" type="text" readonly />
        </div>
        <div class="form-group">
          <label>ID Cita:</label>
          <input v-model="idCita" type="text" readonly />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Estado de la Orden Médica:</label>
          <input v-model="estadoOM" type="text" readonly />
        </div>
        <div class="form-group">
          <label>Fecha:</label>
          <input v-model="fecha" type="date" readonly />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Diagnóstico:</label>
          <textarea v-model="diagnostico" readonly></textarea>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Órdenes:</label>
          <textarea v-model="ordenes" readonly></textarea>
        </div>
        <div class="form-group">
          <label>Recomendaciones:</label>
          <textarea v-model="recomendaciones" readonly></textarea>
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
  border: 2px solid #007bff; 
  background-color: #f7f9fc; 
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s ease; 
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #0056b3; 
  outline: none; 
}

.form-group textarea {
  resize: vertical;
  min-height: 100px; 
}
</style>
