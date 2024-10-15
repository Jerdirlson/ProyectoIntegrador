<script setup lang="ts">
import { ref } from 'vue';

// Definir todos los campos como variables reactivas
const idOrden_Medica = ref('');
const idCita = ref('');
const estadoOM = ref('');
const fecha = ref('');
const diagnostico = ref('');
const ordenes = ref('');
const recomendaciones = ref('');

// Función para manejar el envío del formulario
const submitForm = () => {
  const formData = {
    idOrden_Medica: idOrden_Medica.value,
    idCita: idCita.value,
    estadoOM: estadoOM.value,
    fecha: fecha.value,
    diagnostico: diagnostico.value,
    ordenes: ordenes.value,
    recomendaciones: recomendaciones.value,
  };
  console.log('Datos de la orden médica:', formData);
  // Aquí puedes añadir la lógica para enviar los datos al backend
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

      <button type="submit" class="submit-button">Enviar</button>
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
