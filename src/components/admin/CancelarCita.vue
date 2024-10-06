<script>
export default {
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    cancelarCita() {
      alert("Cita cancelada.");
    },
    salir() {
      // Lógica para la acción de salir
      alert("Saliendo...");
      this.$el.querySelector(".salir-btn").classList.add("animate-salida");
      setTimeout(() => {
        // Lógica adicional para salir o redirigir
      }, 500); // Ajusta el tiempo para la duración de la animación
    }
  }
};
</script>





<template>
  <div class="flex flex-col h-screen">
    <!-- Contenedor para los banners -->
    <div class="flex">
      

     
    </div>

    <div class="flex flex-1 overflow-hidden">
      <!-- Contenido principal a la izquierda -->
      <div class="flex-1 p-10 overflow-y-auto bg-gray-100">
        <div class="bg-white shadow-lg rounded-lg p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl mt-10 animate-fade-in">
          <div class="flex justify-center mb-6">
            <h2 class="text-4xl font-bold text-blue-600">Cancelar Cita</h2>
          </div>

          <!-- Contenedor del formulario de cancelar cita -->
          <div class="bg-white p-6 rounded-lg shadow-lg mx-auto w-full max-w-lg animate-bounce-in">
            <div class="flex items-center mb-4">
              <label class="block text-gray-700" for="documento">Número de documento</label>
              <input type="text" id="documento" placeholder="Ingrese el número de documento" class="border border-gray-300 rounded-md p-3 w-full ml-2 transition-transform duration-300 hover:scale-105" />
              <button class="bg-blue-600 text-white py-2 px-4 rounded ml-2 hover:bg-blue-500 transition duration-300">
                Buscar
              </button>
            </div>

            <p class="mb-4 font-semibold text-lg text-gray-800">Paciente: Juan David Carvajal</p>
            <div class="mb-6 p-4 border border-gray-300 rounded-lg">
              <p class="font-semibold"><strong>Información de la cita:</strong></p>
              <p>Hora: 4:15 PM</p>
              <p>Doctor: Dr. xxx</p>
              <p>Consultorio: xx-x</p>
              <p>Valor: $xx</p>
            </div>

            <button class="bg-red-600 text-white py-3 px-6 rounded w-full hover:bg-red-500 transition duration-300 transform hover:scale-105">
              Cancelar cita
            </button>
          </div>
        </div>
      </div>

   
    </div>

    <!-- Botón de "Cancelar Cita" en la parte inferior en color celeste -->
    <button
      class="lg:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-4 rounded-full focus:outline-none transition-all duration-300 hover:bg-blue-500 hover:scale-110"
      @click="cancelarCita"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
      Cancelar cita
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

/* Animación para el cuadro de "Cancelar Cita" */
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s forwards;
}

/* Animación para el contenedor del formulario */
@keyframes bounce-in {
  0% {
    transform: scale(0.95);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-bounce-in {
  animation: bounce-in 0.3s forwards;
}
</style>
