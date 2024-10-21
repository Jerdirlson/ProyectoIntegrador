<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getOrdenMedicaPorCC, updateOrdenMedica } from '@/service/DoctorService'; // Asegúrate de tener esta función en tu servicio
import { useRoute } from 'vue-router';

// Definir todos los campos como variables reactivas
const idOrden_Medica = ref('');
const idCita = ref('');
const estadoOM = ref('');
const fecha = ref('');
const diagnostico = ref('');
const ordenes = ref('');
const recomendaciones = ref('');
// Obtener el CC del paciente de la ruta (query o params)
const route = useRoute();

const cargarOrdenMedica = async () => {
  const ccPaciente = route.query.cc; // Obtener el CC del paciente desde la query
  if (typeof ccPaciente === 'string' || typeof ccPaciente === 'number') {
    try {
      // Llamar al servicio con el CC del paciente
      const ordenMedica = await getOrdenMedicaPorCC(ccPaciente); 

      if (ordenMedica) {
        // Asignar los valores del objeto ordenMedica a las variables reactivas
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

// Cargar la orden médica al montar el componente
onMounted(() => {
  cargarOrdenMedica();
});

const submitForm = async () => {
  // Crear un objeto formData con los valores del formulario
  const formData = {
    idCita: Number(idCita.value),  // Asegúrate de que sea un número
    estadoOM: Number(estadoOM.value),  // Asegúrate de que sea un número
    diagnostico: diagnostico.value,  // String
    ordenes: ordenes.value,  // String
    recomendaciones: recomendaciones.value,  // String
  };
  
  try {
    // Llamar a la función updateOrdenMedica con el ID y el objeto formData
    const response = await updateOrdenMedica(String(idOrden_Medica.value), formData);
    console.log('Orden médica actualizada:', response);
    alert('Orden médica actualizada correctamente');
  } catch (error) {
    console.error('Error al actualizar la orden médica:', error);
    alert('Error al actualizar la orden médica. Revisa la consola para más detalles.');
  }
};

</script>

<template>
  <div class="form-container">
    <form @submit.prevent="submitForm" class="styled-form">
      <h2>Formulario de Orden Médica</h2>

      <div class="form-row">
        <div class="form-group">
          <label>ID Orden Médica:</label>
          <input v-model="idOrden_Medica" type="text" required />
        </div>
        <div class="form-group">
          <label>ID Cita:</label>
          <input v-model="idCita" type="text" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Estado de la Orden Médica:</label>
          <input v-model="estadoOM" type="text" required />
        </div>
        <div class="form-group">
          <label>Fecha:</label>
          <input v-model="fecha" type="date" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Diagnóstico:</label>
          <textarea v-model="diagnostico" required></textarea>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Órdenes:</label>
          <textarea v-model="ordenes" required></textarea>
        </div>
        <div class="form-group">
          <label>Recomendaciones:</label>
          <textarea v-model="recomendaciones" required></textarea>
        </div>
      </div>

      <button type="submit" class="submit-button">Actualizar Orden Médica</button>
    </form>
  </div>
</template>

<style scoped>
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
