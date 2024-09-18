<script setup lang="ts">
import { reactive } from 'vue';

const formData = reactive({
  nombres: '',
  apellidos: '',
  tipoDocumento: 'C.C',
  numeroDocumento: '',
  telefono: '',
  correo: ''
});

const submitForm = () => {
  console.log('Datos del formulario:', formData);
  // Aquí puedes agregar la lógica para enviar los datos al servidor
};
</script>

<template>
  <form @submit.prevent="submitForm" class="max-w-5xl mx-auto mt-12 p-6 space-y-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="space-y-2">
        <label for="nombres" class="block text-lg font-medium text-gray-700">Nombres</label>
        <input type="text" id="nombres" v-model="formData.nombres" required
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg py-2 px-3">
      </div>

      <div class="space-y-2">
        <label for="apellidos" class="block text-lg font-medium text-gray-700">Apellidos</label>
        <input type="text" id="apellidos" v-model="formData.apellidos" required
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg py-2 px-3">
      </div>

      <div class="space-y-2">
        <label for="tipoDocumento" class="block text-lg font-medium text-gray-700">Tipo de documento</label>
        <select id="tipoDocumento" v-model="formData.tipoDocumento" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg py-2 px-3">
          <option value="C.C">C.C</option>
          <option value="T.I">T.I</option>
          <option value="C.E">C.E</option>
        </select>
      </div>

      <div class="space-y-2">
        <label for="numeroDocumento" class="block text-lg font-medium text-gray-700">Número de documento</label>
        <input type="text" id="numeroDocumento" v-model="formData.numeroDocumento" required
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg py-2 px-3">
      </div>

      <div class="space-y-2">
        <label for="telefono" class="block text-lg font-medium text-gray-700">Número de teléfono</label>
        <input type="tel" id="telefono" v-model="formData.telefono" required
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg py-2 px-3">
      </div>

      <div class="space-y-2">
        <label for="correo" class="block text-lg font-medium text-gray-700">Correo electrónico</label>
        <input type="email" id="correo" v-model="formData.correo" required
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg py-2 px-3">
      </div>
    </div>
  </form>
</template>