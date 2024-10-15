<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import { ref } from "vue";

const type = ref("");

// Función para manejar las acciones del selector
const manejarCita = () => {
  switch (type.value) {
    case "agendar":
      alert("Redirigiendo a la página de Agendar Cita...");
      break;
    case "cancelar":
      alert("Redirigiendo a la página de Cancelar Cita...");
      break;
    case "reagendar":
      alert("Redirigiendo a la página de Re-Agendar Cita...");
      break;
    case "ver":
      alert("Redirigiendo a la página de Ver mis citas...");
      break;
    default:
      alert("Por favor seleccione una acción válida.");
      break;
  }
};
</script>

<template>
  <MainLayout>
    <div class="w-full h-[calc(100vh-9rem)]">
      <div class="w-full h-full p-16">
        <div class="flex flex-col h-full w-full">
          
          <!-- Barra de Atención arriba -->
          <div class="flex absolute h-14 w-96 bg-primary -left-6 top-50 rounded-3xl justify-center items-center">
            <p class="flex w-1/2 text-2xl font-bold text-neutral-200">
              Atención
            </p>
          </div>
          
          <!-- Texto "Selecciona una acción..." con más espacio arriba -->
          <div class="flex flex-col w-full h-1/6 px-18 gap-y-7 mt-16">
            <div class="text-2xl mt-10">
              Selecciona una acción para manejar tus citas.
            </div>
          </div>
          
          <!-- Selector de acciones -->
          <div class="flex flex-col justify-center items-center mt-10">
            <h2 class="text-3xl font-bold mb-6">Manejo de Citas</h2>
            <select v-model="type" class="border border-gray-300 rounded-lg p-2 mb-4">
              <option value="">Selecciona una acción</option>
              <option value="agendar">Agendar</option>
              <option value="cancelar">Cancelar</option>
              <option value="reagendar">Re-Agendar</option>
              <option value="ver">Ver mis citas</option>
            </select>
            <button class="bg-green-500 text-white px-4 py-2 rounded" @click="manejarCita">
              Seleccionar Acción
            </button>
          </div>
          
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
.bg-primary {
  background-color: #1e90ff;
}
.text-neutral-200 {
  color: #f0f0f0;
}
</style>
