<script setup lang="ts">
import InfoPatient from '@/components/doctor/InfoPatient.vue';
</script>

<template>
    <div class="flex flex-col min-h-screen relative">
      <main class="flex flex-1">
        <div class="content-container flex-grow">
          <div class="flex justify-center items-center h-full">
            <InfoPatient />
          </div>
        </div>
      </main>
    </div>
  </template>
  

  <style scoped>
  .sidebar-container {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999; /* Estar encima de todo */
  }
  
  .content-container {
    margin-right: auto;
    margin-left: auto; 
    padding-right: 10rem; /* Ajusta el espacio para evitar el solapamiento con el sidebar */
  }
  
  .flex-grow {
    flex-grow: 1;
  }
  
  </style>
  