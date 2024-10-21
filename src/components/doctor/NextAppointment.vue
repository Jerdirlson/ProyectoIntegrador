<template>
    <div class="appointment-card">
      <h3>Siguiente cita</h3>
      <br>
      <div class="appointment-details">
        <div class="appointment-info">
          <span>{{ appointment.name }}</span>
          <span>{{ appointment.time }}</span>
          <span>{{ appointment.date }} años</span>
          <span>{{ appointment.type }}</span>
          <button @click="seeDetails" class="view-btn">Ver Historial</button>
        </div>
      </div>
      <button @click="receiveAppointment" class="receive-btn">Recibir</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        appointment: {
          name: "Jose Daniel Montero",
          time: "8:30 am",
          date: "12",
          type: "M",
        },
      };
    },
    methods: {
      seeDetails() {
      },
      receiveAppointment() {
      },
    },
  };
  </script>
  
  <style scoped>
  .appointment-card {
    width: 100%;
    border: 1px solid #c4e1ff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    position: relative; 
    background-color: #fff;
  }
  
  .appointment-details {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .appointment-info {
    display: flex;
    gap: 20px; 
    justify-content: space-between;
    width: 100%;
    padding-left: 15px;
  }
  
  .view-btn {
    background-color: #339af0;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .view-btn:hover {
    background-color: #228ae6;
  }
  
  .receive-btn {
    background-color: #339af0;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px;
    display: block; 
  }
  
  .receive-btn:hover {
    background-color: #228ae6;
  }
  </style>
  