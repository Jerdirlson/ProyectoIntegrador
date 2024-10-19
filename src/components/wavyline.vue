<script setup lang="ts">
</script>

<template>
    <div class="wave-container">
      <svg width="100%" height="100" viewBox="0 0 1440 100">
        <path
          d="M0 30 C 480 100, 960 0, 1440 30 L 1440 100 L 0 100 Z"
          fill="#106cec"
        />
      </svg>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WaveComponent',
  };
  </script>
  
  <style scoped>
  .wave-container {
    position: relative;
    overflow: hidden;
    width: 100%; /* Asegúrate de que ocupe todo el ancho */
    margin: 0; /* Elimina cualquier margen */
    padding: 0; /* Elimina cualquier padding */
  }
  </style>
  