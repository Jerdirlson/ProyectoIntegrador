<template>
    <div class="emergencies-container">
      <h3>Emergencias</h3>
      <table>
        <thead>
          <tr>
            <th>Id de la emergencia</th>
            <th>Hora de llegada</th>
            <th>Nivel de emergencia</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(emergency, index) in emergencies" :key="index">
            <td>{{ emergency.idEmergencia }}</td>
            <td>{{ emergency.horaLlegada }}</td>
            <td>{{ emergency.tipoEmergencia }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { getEmergenciasPrioridad } from '@/service/DoctorService';
  
  export default {
    data() {
      return {
        emergencies: [],
      };
    },
    mounted() {
      // Llamar a la API al montar el componente
      this.fetchEmergencies();
    },
    methods: {
      async fetchEmergencies() {
        try {
          const data = await getEmergenciasPrioridad(); // Usar el servicio
          this.emergencies = data; // Actualizar con los datos obtenidos
        } catch (error) {
          console.error('Error al obtener las emergencias:', error);
        }
      },
    },
  };
  </script>
  
  
  <style scoped>
  .emergencies-container {
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    font-family: Arial, sans-serif;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  thead th {
    text-align: left;
    padding: 10px;
    border-bottom: 2px solid #ccc;
  }
  
  tbody td {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  
  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  </style>
  