<template>
    <div class="observations-section">
      <label for="observations">Observaciones</label>
      <textarea id="observations" v-model="observations" rows="4"></textarea>
      <button @click="finalizeAppointment" class="finalize-btn">Finalizar cita</button>
    </div>
  </template>x

<script>
export default {
  data() {
    return {
      observations: '',
    };
  },
  methods: {
    finalizeAppointment() {
      if (this.observations.trim()) {
        console.log('Cita finalizada con observaciones:', this.observations);
      } else {
        console.log('Cita finalizada sin observaciones.');
      }
    },
  },
};
</script>


<style scoped>
.observations-section {
  width: 1150px; 
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

label {
  font-weight: bold;
}

textarea {
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
}

.finalize-btn {
  align-self: flex-end;
  padding: 10px 20px;
  background-color: #868e96;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.finalize-btn:hover {
  background-color: #495057;
}
</style>
