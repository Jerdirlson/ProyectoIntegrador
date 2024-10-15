<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import { ref } from "vue";

const appointmentData = ref([
  { categoria: "Agendar", accion: "agendar" },
  { categoria: "Cancelar", accion: "cancelar" },
  { categoria: "Re-Agendar", accion: "reagendar" },
  { categoria: "Ver mis citas", accion: "ver" }
]);

const manejarCita = (accion: string) => {
  switch (accion) {
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
            <p class="flex w-1/2 text-2xl font-bold text-neutral-200">Atención</p>
          </div>
          
          <!-- Texto "Selecciona una acción..." con más espacio arriba -->
          <div class="flex flex-col w-full h-1/6 px-18 gap-y-7 mt-16">
            <div class="text-xl mt-10">
              Selecciona una acción para manejar tus citas.
            </div>
          </div>
          
          <!-- Contenedor de botones estilo tarjetas con ancho y alto más grandes -->
          <div class="flex justify-center items-center w-full mt-10">
            <div class="bg-white rounded-lg shadow-lg p-12 w-[700px]">
              <h2 class="text-3xl font-bold text-center mb-8">Manejo de Citas</h2>
              <div class="grid grid-cols-2 gap-6">
                <button 
                  v-for="service in appointmentData" 
                  :key="service.accion" 
                  class="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-5 px-10 rounded-lg shadow-md hover:shadow-lg transition-all"
                  @click="manejarCita(service.accion)"
                >
                  {{ service.categoria }}
                </button>
              </div>
            </div>
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
