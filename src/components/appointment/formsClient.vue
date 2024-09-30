<script setup lang="ts">
import { reactive } from 'vue';

const formData = reactive({
  nombres: 'Christian Mauricio',
  apellidos: 'Currucucú',
  tipoDocumento: 'C.C',
  numeroDocumento: '3100098946',
  telefono: '3100098946',
  correo: 'correoEjemplo@gmail.com'
});
</script>

<template>
  <form class="max-w-5xl mx-auto mt-9 p-4 space-y-6">
    <div class="grid grid-cols-2 md:grid-cols-2 gap-1">
      <div>
        <label class="block text-xl font-medium text-gray-600">Nombres:</label>
        <h2 class="text-2xl font-semibold text-gray-800 mt-1">{{ formData.nombres }}</h2>
        <hr class="my-4 border-gray-300">
      </div>

      <div>
        <label class="block text-xl font-medium text-gray-600">Tipo de documento:</label>
        <h2 class="text-2xl font-semibold text-gray-800 mt-1">{{ formData.tipoDocumento }}</h2>
        <hr class="my-4 border-gray-300">
      </div>

      <div>
        <label class="block text-xl font-medium text-gray-600">Apellidos:</label>
        <h2 class="text-2xl font-semibold text-gray-800 mt-1">{{ formData.apellidos }}</h2>
        <hr class="my-4 border-gray-300">
      </div>

      <div>
        <label class="block text-xl font-medium text-gray-600">Número de documento:</label>
        <h2 class="text-2xl font-semibold text-gray-800 mt-1">{{ formData.numeroDocumento }}</h2>
        <hr class="my-4 border-gray-300">
      </div>

      <div>
        <label class="block text-xl font-medium text-gray-600">Número de teléfono:</label>
        <h2 class="text-2xl font-semibold text-gray-800 mt-1">{{ formData.telefono }}</h2>
        <hr class="my-4 border-gray-300">
      </div>

      <div>
        <label class="block text-xl font-medium text-gray-600">Correo electrónico:</label>
        <h2 class="text-2xl font-semibold text-gray-800 mt-1">{{ formData.correo }}</h2>
        <hr class="my-4 border-gray-300">
      </div>
    </div>
  </form>
</template>
