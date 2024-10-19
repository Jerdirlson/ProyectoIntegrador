<template>
    <div class="emergency-card">
      <h4>Emergencia</h4>
      <div class="card-content">
        <div class="emergency-info">
          <span class="name">{{ emergency.nombre }}</span>
          <span class="level">{{ emergency.nivel }}</span>
          <span class="time">{{ emergency.hora }}</span>
          <span class="doctor">{{ emergency.doctor }}</span>
        </div>
      </div>
      <div class="footer">
        <button @click="enqueue" class="enqueue-btn">ENCOLAR</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        emergency: {
          nombre: 'Juan David Muñoz',
          nivel: 'Alta',
          hora: '6:30 PM',
          doctor: 'NA',
        },
      };
    },
    methods: {
      enqueue() {
      },
    },
  };
  </script>
  
  <style scoped>
  .emergency-card {
    border: 1px solid #d6d6d6;
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    max-width: 600px;
    margin: 20px auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h4 {
    margin-bottom: 10px;
  }
  
  .card-content {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #00aaff;
    border-radius: 10px;
  }
  
  .emergency-info {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  
  .emergency-info span {
    flex-basis: 25%;
    text-align: center;
  }
  
  .name, .level, .time, .doctor {
    font-size: 16px;
  }
  
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
  
  .enqueue-btn {
    background-color: #ff3b3f;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .enqueue-btn:hover {
    background-color: #e62e32;
  }
  
  small {
    color: #aaa;
    font-size: 12px;
  }
  </style>
  