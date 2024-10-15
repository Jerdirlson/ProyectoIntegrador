<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// Importar los menús
import { menuOperario, menuAdmin } from "@/utils/menu";

// Obtener la instancia del router
const router = useRouter();

// Estado para el menú
const menuOpen = ref(false);

// Función para alternar el estado del menú
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Función para manejar la navegación
const handleNavigation = (route: string) => {
  router.push(route);
};
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex justify-center mt-20">
      <h2 class="text-4xl font-bold text-center text-blue-600">
        Bienvenido al módulo Operador
      </h2>
    </div>

    <div class="flex flex-1 overflow-hidden">
      <!-- Contenedor del menú con barra de desplazamiento -->
      <div class="flex-1 p-10 bg-gray-100 overflow-y-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <!-- Iterar sobre el menú operador y mostrar botones con íconos -->
          <button
              v-for="(item, index) in menuOperario"
              :key="index"
              class="menu-button bg-white shadow-lg rounded-lg p-8 flex items-center justify-center text-center text-black font-bold text-2xl hover:bg-blue-300 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              @click="handleNavigation(item.route)"
          >
            <component :is="item.icon" class="h-8 w-8 mr-2" />
            {{ item.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Botón para abrir el menú en dispositivos móviles -->
    <button
        class="lg:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full focus:outline-none"
        @click="toggleMenu"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
/* Estilos para los botones del menú */
.menu-button {
  background-color: #ffffff;
  color: #000000;
  transition: all 0.5s ease;
  cursor: pointer;
  border: none;
  outline: none;
}

.menu-button:hover {
  background-color: #63b3ed;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: scale(1.05) translateY(-10px);
}

/* Estilos generales y animaciones */
html, body {
  overflow: hidden;
}

body {
  height: 100%;
  margin: 0;
  padding: 0;
}

h2 {
  color: #2b6cb0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  margin-top: 10px;
  margin-bottom: 3cm;
}

.overflow-y-auto {
  max-height: calc(100vh - 150px);
  overflow-y: auto;
}

.grid {
  padding-bottom: 20px;
}
</style>
