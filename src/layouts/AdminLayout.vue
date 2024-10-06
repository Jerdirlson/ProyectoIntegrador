<template>
  <div class="flex flex-col h-screen">
    <!-- Contenedor para los banners -->
    <div class="flex">
      <!-- Banner gris superior con botón "Salir" a la izquierda -->
      <header class="bg-gray-200 text-gray-700 p-2 flex-grow">
        <button 
          class="hover:text-gray-900 transition-transform duration-300 hover:scale-105 hover:opacity-80 salir-btn flex items-center"
          @click="salir"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9V5a3 3 0 00-3-3H4a3 3 0 00-3 3v14a3 3 0 003 3h3a3 3 0 003-3v-4m5-7l5 5m0 0l-5 5m5-5H9" />
          </svg>
          Salir
        </button>
      </header>

      <!-- Banner azul a la derecha -->
      <div class="bg-blue-600 text-white w-64 lg:w-1/5 p-2 flex items-center justify-center">
        <img class="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none" src="../../public/svg/logoSinLetras.svg" alt="Logo">
      </div>
    </div>

    <div class="flex flex-1 overflow-hidden">
      <!-- Contenido principal (slot) -->
      <div class="flex-1 bg-gray-100 overflow-y-auto">
        <slot></slot>
      </div>

      <!-- Sidebar a la derecha -->
      <aside class="bg-blue-600 text-white w-64 lg:w-1/5 p-5 overflow-y-auto">
        <nav class="flex-grow">
          <ul>
            <li v-for="(item, index) in menuItems" :key="index" class="mb-6">
              <router-link :to="item.route" class="hover:text-blue-300 transition-colors duration-300">
                {{ item.name }}
              </router-link>
            </li>
            <!-- Logo -->
            <li class="mt-8">
              <img src="../../public/svg/LogoLetrasGrandes.svg" alt="Logo" class="h-16 mx-auto" />
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const menuItems = ref([
  { name: "Inicio", route: "/inicio" },
  { name: "Registro Usuarios", route: "/registro-usuarios" },
  { name: "Agendamiento Citas", route: "/agendamiento-citas" },
  { name: "Re-agendamiento Citas", route: "/re-agendamiento-citas" },
  { name: "Cancelación citas", route: "/cancelacion-citas" },
  { name: "Emergencias", route: "/emergencias" },
  { name: "Historial Medico", route: "/historial-medico" },
  { name: "Hoja Vida", route: "/hoja-vida" },
  { name: "Factura Electronica", route: "/factura-electronica" },
  { name: "Colilla Pago", route: "/colilla-pago" },
  { name: "ERP", route: "/erp" },
  { name: "CRM", route: "/crm" },
  { name: "AUDITORIA", route: "/auditoria" }
]);

function salir() {
  alert("Saliendo...");
  const salirBtn = document.querySelector(".salir-btn");

  setTimeout(() => {
    // Lógica adicional para salir o redirigir
  }, 500);
}
</script>

<style scoped>
@keyframes salida {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.7);
    opacity: 0;
  }
}

.animate-salida {
  animation: salida 0.5s forwards;
}

.overflow-y-auto {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.overflow-y-auto::-webkit-scrollbar {
  display: none;
}

.bg-white {
  background-color: #ffffff;
}

.text-black {
  color: #000000;
}

.hover\:bg-blue-300:hover {
  background-color: #63b3ed;
}
</style>
