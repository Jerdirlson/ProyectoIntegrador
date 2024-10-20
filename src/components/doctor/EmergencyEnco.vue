<template>
  <div class="emergency-card">
    <h4>Encolar emergencia</h4>
    <div class="footer">
      <button @click="handleEnqueue" class="enqueue-btn" :disabled="isLoading">
        {{ isLoading ? 'PROCESANDO...' : 'ENCOLAR' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { enqueueDoctor, popDoctor } from '@/service/DoctorService';

const isLoading = ref(false);
const idDoc = '111';

const handleEnqueue = async () => {
  isLoading.value = true;
  try {
    await enqueueDoctor(idDoc);
    console.log('Doctor encolado exitosamente');

    const result = await popDoctor(idDoc);
    console.log('Resultado de pop:', result);

    alert('Proceso completado: Doctor encolado y desencolado');
  } catch (error) {
    console.error('Error en el proceso:', error);
    alert('Ocurrió un error en el proceso');
  } finally {
    isLoading.value = false;
  }
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
  