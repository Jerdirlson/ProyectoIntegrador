<template>
    <div class="patient-card">
      <div class="patient-info">
        <span>Paciente: </span>
        <span>Género: </span>
        <span>CC: </span>
      </div>
      <div class="medical-info">
        <div class="section">
          <span>Historia Médica</span>
          <div class="buttons">
            <button class="btn red" @click="viewMedicalHistory">VER</button>
            <button class="btn red" @click="editMedicalHistory">EDITAR</button>
            <button class="btn red" @click="createMedicalHistory">CREAR</button>
          </div>
        </div>
        <div class="section">
          <span>Orden Médica</span>
          <div class="buttons">
            <button class="btn red" @click="viewMedicalOrder">VER</button>
            <button class="btn red" @click="editMedicalOrder">EDITAR</button>
            <button class="btn red" @click="createMedicalOrder">CREAR</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      patient: {
        type: Object,
        required: true,
      },
    },
    mounted() {
      console.log(this.patient);  // Agrega este log para verificar si se reciben los datos
    },
    methods: {
      viewMedicalHistory() {
        console.log('Ver Historia Médica');
      },
      editMedicalHistory() {
        console.log('Editar Historia Médica');
      },
      createMedicalHistory() {
        console.log('Crear Historia Médica');
      },
      viewMedicalOrder() {
        console.log('Ver Orden Médica');
      },
      editMedicalOrder() {
        console.log('Editar Orden Médica');
      },
      createMedicalOrder() {
        console.log('Crear Orden Médica');
      },
    },
  };
  </script>
  
<style scoped>
.patient-card {
  background-color: #339af0;
  padding: 20px;
  border-radius: 10px;
  color: white;
  width: 100%;
  max-width: 700px;
  margin: 20px auto;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.patient-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.medical-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.buttons {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.red {
  background-color: #f03e3e;
  color: white;
}

.red:hover {
  background-color: #d63333;
}
</style>
