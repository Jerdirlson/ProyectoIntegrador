<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Paciente</th>
          <th>Hora</th>
          <th>Servicio</th>
          <th>ID Citas</th>
          <th>CC</th>
          <th>DOC</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <!-- Si no hay citas, muestra un mensaje en una fila -->
        <tr v-if="citas.length === 0">
        </tr>

        <!-- Si hay citas, renderiza las filas -->
        <tr v-for="(cita, index) in citas" :key="index">
          <td>{{ cita.nombrePaciente || 'N/A' }}</td>
          <td>{{ cita.hora || 'N/A' }}</td>
          <td>{{ cita.nombreServicio || 'N/A' }}</td>
          <td>{{ cita.idCita || 'N/A' }}</td>
          <td>{{ cita.cc || 'N/A' }}</td>
          <td>{{ cita.nombreDoctor || 'N/A' }}</td>
          <td>
            <button @click="$emit('reagendar', cita.idCita)" class="bg-green-500 text-white py-2 px-4 rounded">Re-agendar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Cita {
  nombrePaciente: string;
  hora: string;
  nombreServicio: string;
  idCita: string;
  cc: string;
  nombreDoctor: string;
}

const props = defineProps<{
  citas: Cita[];
}>();
</script>

<style scoped>
.table-container {
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

table th, table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

thead {
  background-color: #f5f5f5;
}
</style>
