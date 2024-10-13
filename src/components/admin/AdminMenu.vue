
<script setup lang="ts">
import { ref } from 'vue';

// Estado para el menú
const menuOpen = ref(false);

// Definición de los elementos del menú
const menuItems = ref([
  { name: "Registro Usuarios", route: "/admin/user-registration" },
  { name: "Agendamiento Citas", route: "/admin/schedule-appointment" },
  { name: "Re-agendamiento Citas", route: "/admin/reschedule-appointment" },
  { name: "Cancelación Citas", route: "/admin/cancel-appointment" },
  { name: "Emergencias", route: "/admin/emergencies" },
  { name: "Historial Médico", route: "/admin/medical-orders" },
  { name: "Hoja Vida", route: "/admin/resume" },
  { name: "Factura Electrónica", route: "/admin/invoices" },
  { name: "Colilla Pago", route: "/admin/payment-receipt" },
  { name: "ERP", route: "/admin/erp" },
  { name: "CRM", route: "/admin/crm" },
  { name: "Auditoría", route: "admin/audit" },
]);

// Función para alternar el estado del menú
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

// Función para salir con animación
const salir = () => {
  alert("Saliendo...");
  document.querySelector(".salir-btn").classList.add("animate-salida");
  setTimeout(() => {
    // Lógica adicional para salir o redirigir
  }, 500);
};
</script>


<template>
  <div class="flex flex-col h-screen">
    <div class="flex justify-center mt-20">
      <h2 class="text-4xl font-bold text-center text-blue-600">
        Bienvenidos al módulo administración
      </h2>
    </div>

    <div class="flex flex-1 overflow-hidden">
      <!-- Contenedor del menú con barra de desplazamiento -->
      <div class="flex-1 p-10 bg-gray-100 overflow-y-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div
            v-for="item in menuItems"
            :key="item.name"
            class="bg-white shadow-lg rounded-lg p-8 flex items-center justify-center text-center text-black font-bold text-2xl hover:bg-blue-300 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
          >
            <router-link :to="item.route">{{ item.name }}</router-link>
          </div>
        </div>
      </div>

      <!-- Sidebar a la derecha -->
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
/* Animación para el botón de Salir */
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

/* Estilo y animación de los botones */
.bg-white {
  background-color: #ffffff;
}

.text-black {
  color: #000000;
}

.hover\:bg-blue-300:hover {
  background-color: #63b3ed;
}

.shadow-lg:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.transition-all {
  transition: all 0.5s ease;
}

.transform:hover {
  transform: scale(1.05) translateY(-10px);
}

/* Quitar barra de desplazamiento */
html,
body {
  overflow: hidden; /* Esto oculta las barras de desplazamiento de toda la página */
}

body {
  height: 100%;
  margin: 0;
  padding: 0;
}

/* Estilo del mensaje de bienvenida */
h2 {
  color: #2b6cb0; /* Color azul */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  margin-top: 10px; /* Reducido a 1 cm */
  margin-bottom: 3cm; /* Margen inferior de 3 cm */
}

/* Estilo para la barra de desplazamiento */
.overflow-y-auto {
  max-height: calc(100vh - 150px); /* Ajusta la altura máxima según sea necesario */
  overflow-y: auto; /* Agrega la barra de desplazamiento vertical */
}

.grid {
  /* Añade espacio entre los elementos de la cuadrícula */
  padding-bottom: 20px; /* Espacio en la parte inferior de la cuadrícula */
}
</style>
