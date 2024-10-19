<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getPacientesAsignadosAlDoctor } from '@/service/DoctorService';
import { useRouter } from 'vue-router';

const router = useRouter();

const citas = ref([]);

const cargarPacientesDelDoctor = async () => {
  try {
    const idDoctor = '111';
    const pacientes = await getPacientesAsignadosAlDoctor(idDoctor);
    citas.value = pacientes; 
  } catch (error) {
    console.error('Error al cargar los pacientes:', error);
  }
};

const nextAppointment = computed(() => {
  const currentDateTime = new Date();
  let closestAppointment = null;

  for (const cita of citas.value) {
    const [hours, minutes] = cita.hora.split(':');
    const appointmentTime = new Date();
    appointmentTime.setHours(parseInt(hours), parseInt(minutes), 0);

    const tenMinutesAfter = new Date(appointmentTime.getTime() + 10 * 60000);
    
    if (currentDateTime <= tenMinutesAfter) {
      if (!closestAppointment || appointmentTime < new Date(closestAppointment.hora)) {
        closestAppointment = cita;
      }
    }
  }
  return closestAppointment;
});

const isActiveAppointment = computed(() => {
  if (!nextAppointment.value) return false;

  const appointmentHour = new Date();
  const [hours, minutes] = nextAppointment.value.hora.split(':');
  appointmentHour.setHours(parseInt(hours), parseInt(minutes), 0);

  const currentHour = new Date();
  const tenMinutesAfter = new Date(appointmentHour.getTime() + 10 * 60000);
  
  return currentHour <= tenMinutesAfter;
});

const showCancelButton = computed(() => isActiveAppointment.value);

const receiveAppointment = () => {
  if (nextAppointment.value) {
    router.push({ 
      name: 'docdate',
      params: { 
        patient: nextAppointment.value 
      } 
    });
  }
};

onMounted(() => {
  cargarPacientesDelDoctor();
});
</script>

<template>
  <div class="container">
    <div class="table-container">
      <h2>Todas las citas</h2>
      <table>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>CC</th>
            <th>Hora</th>
            <th>Género</th>
            <th>Historial clínico</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cita in citas" :key="cita.idCita">
            <td>{{ cita.nombreUsuario }} {{ cita.apellidoUsuario }}</td>
            <td>{{ cita.CC }}</td>
            <td>{{ cita.hora }}</td>
            <td>{{ cita.sexo }}</td>
            <a href="H" @click="verHistoriaClinica(cita.idHistoria_Medica)" class="view-link">Ver</a>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Card con la siguiente cita -->
    <div :class="['appointment-card', isActiveAppointment ? 'active-appointment' : '']">
      <h3>Siguiente cita</h3>
      <br />
      <table v-if="nextAppointment" class="next-appointment-table">
        <tbody>
          <tr>
            <td>{{ nextAppointment.nombreUsuario }} {{ nextAppointment.apellidoUsuario }}</td>
            <td>{{ nextAppointment.hora }}</td>
            <td>{{ nextAppointment.sexo }}</td>
          </tr>
        </tbody>
      </table>
      <!-- Botón "Recibir" que navega a la vista separada -->
      <div class="appointment-actions" v-if="nextAppointment">
        <button v-if="showCancelButton" @click="cancelAppointment" class="cancel-btn">Cancelar</button>
        <button @click="receiveAppointment" class="receive-btn">Recibir</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.table-container {
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
}

table th,
table td {
  padding: 12px 15px;
  text-align: left;
}

thead {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

tbody tr {
  transition: background-color 0.2s ease;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

.view-link {
  color: #007bff;
  text-decoration: none;
}

.view-link:hover {
  text-decoration: underline;
}

h2 {
  margin-bottom: 15px;
  color: #333;
  font-size: 1.5rem;
}

.appointment-card {
  width: 100%;
  border: 1px solid #c4e1ff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  transition: background-color 0.3s ease;
}

.active-appointment {
  background-color: #007bff;
  color: white;
}

.appointment-actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.receive-btn,
.cancel-btn {
  background-color: #33eb00;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.receive-btn:hover {
  background-color: #0056b3;
}

.cancel-btn {
  background-color: #f03e3e; 
}

.cancel-btn:hover {
  background-color: #d63333; 
}

.next-appointment-table {
  width: 100%;
  border-collapse: collapse;
}

.next-appointment-table th,
.next-appointment-table td {
  padding: 12px 15px;
  text-align: left;
}

.next-appointment-table tbody {
  background-color: #007bff;
}

tbody tr:hover {
  background-color: #f1f1f1;
  color: #333; /* Asegura que el color del texto sea oscuro y visible */
}

tbody tr:hover td {
  color: #333; /* Evita que el texto se vuelva blanco */
}

</style>
