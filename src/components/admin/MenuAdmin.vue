<template>
  <div class="flex flex-col h-screen">
   
    <div class="flex">
 
     
    </div>

    <div class="flex flex-1 overflow-hidden">
      <!-- Contenido principal, solo el menú -->
      <div class="flex-1 p-10 bg-gray-100 overflow-hidden">
        <h2 class="text-4xl font-bold text-center mb-12 text-blue-600">Bienvenidos al módulo administración</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div 
            v-for="menu in menuGrid" 
            :key="menu" 
            class="bg-white shadow-lg rounded-lg p-8 flex items-center justify-center text-center text-black font-bold text-2xl hover:bg-blue-300 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
          >
            {{ menu }}
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

<script>
export default {
  data() {
    return {
      menuOpen: false,
      menuGrid: [
        'Registro de usuarios',
        'Agenda de citas',
        'Re-agenda de citas',
        'Cancelación de citas',
        'Emergencias',
        'Historial médico',
        'Hoja Vida',
        'Factura Electrónica',
        'Colilla Pago',
        'Planificación de recursos empresariales (ERP)',
        'Gestión de relaciones con el cliente (CRM)',
        'AUDITORÍAS'
      ],
      
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    salir() {
      alert("Saliendo...");
      this.$el.querySelector(".salir-btn").classList.add("animate-salida");
      setTimeout(() => {
        // Lógica adicional para salir o redirigir
      }, 500);
    }
  }
};
</script>

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
html, body {
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
</style>
