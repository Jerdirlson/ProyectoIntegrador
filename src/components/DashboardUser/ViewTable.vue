<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>CC</th>
          <th>Hora</th>
          <th>Fecha</th>
          <th>Servicio</th>
          <th>ID Citas</th>
          <th>DOC</th>
          <th>Estado</th>
          <th>Pago</th>
        </tr>
      </thead>
      <tbody>
        <!-- Si no hay citas, muestra un mensaje -->
        <tr v-if="citas.length === 0">
        </tr>

        <!-- Renderizar las citas obtenidas -->
        <tr v-for="(cita, index) in citas" :key="index">
          <td>{{ cita.cc || 'N/A' }}</td>
          <td>{{ cita.hora || 'N/A' }}</td>
          <td>{{ cita.fecha || 'N/A' }}</td>
          <td>{{ cita.servicio || 'N/A' }}</td>
          <td>{{ cita.idCita || 'N/A' }}</td>
          <td>{{ cita.doc || 'N/A' }}</td>
          <td :class="cita.estado === 'Activo' ? 'text-green-500' : 'text-red-500'">
            {{ cita.estado || 'N/A' }}
          </td>
          <td :class="cita.pago === 'SI' ? 'text-green-500' : 'text-red-500'">
            {{ cita.pago || 'N/A' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type {citasType} from "@/views/SeeAppointment.vue";


// Recibe las citas como prop
const props = defineProps<{
  citas: citasType[];
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

.text-green-500 {
  color: green;
}

.text-red-500 {
  color: red;
}
</style>
