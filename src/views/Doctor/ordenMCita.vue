<script setup lang="ts">
import { ref } from 'vue';
import { createOrdenMedica } from '@/service/DoctorService'; 
import { useRouter, useRoute } from 'vue-router';

const idCita = ref('');  
const estadoOM = ref('');
const diagnostico = ref('');
const ordenes = ref('');
const recomendaciones = ref('');

const router = useRouter();
const route = useRoute();
const ccPaciente = ref(route.query.cc || '');  

const submitForm = async () => {
  const formData = {
    idCita: Number(idCita.value), 
    estadoOM: Number(estadoOM.value),  
    diagnostico: diagnostico.value,  
    ordenes: ordenes.value,  
    recomendaciones: recomendaciones.value,  
  };

  try {
    const response = await createOrdenMedica(formData);
    console.log('Orden médica creada:', response);
    alert('Orden médica creada correctamente');

    // Redirigir a otra página, por ejemplo, la lista de órdenes
    router.push({ name: 'otraRuta' }); // Cambia 'otraRuta' a la ruta que desees
  } catch (error) {
    console.error('Error al crear la orden médica:', error);
    alert('Error al crear la orden médica. Revisa la consola para más detalles.');
  }
};

</script>

<template>
  <div class="form-container">
    <form @submit.prevent="submitForm" class="styled-form">
      <h2>Crear Orden Médica</h2>

      <div class="form-row">
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

      <button type="submit" class="submit-button">Crear Orden Médica</button>
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
