<script setup lang="ts">
import { useRouter } from "vue-router"; // Importamos el enrutador

const router = useRouter(); // Inicializamos el enrutador

const manejarCita = (accion: string) => {
  switch (accion) {
    case "agendar":
      router.push("/dashboard"); // Redirigir a la página de agendar cita
      break;
    case "cancelar":
      router.push("/patient/cancel-appointment"); // Redirigir a la página de cancelar cita
      break;
    case "reagendar":
      router.push("/patient/reschedule-appointment"); // Redirigir a la página de reagendar cita
      break;
    case "ver":
      router.push("/patient/see-appointment"); // Redirigir a la página de ver citas
      break;
    default:
      alert("Por favor seleccione una acción válida.");
      break;
  }
};
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <!-- Sección de Atención -->
    <div class="flex mt-6">
      <div class="bg-primary text-neutral-200 p-4 w-64 rounded-lg ml-10">
        <h2 class="text-xl font-bold">Atención</h2>
      </div>
    </div>

    <!-- Texto de advertencia -->
  <div class="text-left ml-10"> <!-- Agregamos ml-10 para darle margen a la izquierda -->
    <p class="text-lg">
      Por favor, gestiona tus citas médicas de manera oportuna. Elige una opción a continuación para continuar.
    </p>
  </div>

    <!-- Contenedor principal con el logo y botones -->
    <div class="flex-grow flex justify-center items-center mt-1"> 
      <div class="bg-white shadow-lg rounded-lg p-10 w-3/5">
        <!-- Imagen -->
        <div class="flex justify-center mb-6">
          <img src="/svg/logoSinLetras.svg" alt="Logo" class="h-16 w-auto">
        </div>

        <!-- Línea divisoria -->
        <hr class="border-gray-300 mb-6">

        <!-- Manejo de Citas -->
        <div class="text-center mb-6">
          <p class="text-gray-600 text-2xl font-semibold">Manejo de Citas</p>
        </div>

        <!-- Botones de acción -->
        <div class="grid grid-cols-2 gap-6">
          <button class="bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
            @click="manejarCita('agendar')">
            Agendar
          </button>
          <button class="bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
            @click="manejarCita('cancelar')">
            Cancelar
          </button>
          <button class="bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
            @click="manejarCita('reagendar')">
            Re-Agendar
          </button>
          <button class="bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
            @click="manejarCita('ver')">
            Ver mis citas
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-primary {
  background-color: #1e90ff;
}
.text-neutral-200 {
  color: #f0f0f0;
}
</style>