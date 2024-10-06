<script setup lang="ts">
import { ref, onMounted } from 'vue';

// Variables reactivas
const busqueda = ref('');
const ordenesMedicas = ref([
  { nombre: 'Juan David Muñoz', cc: '1253355', fechaOrden: '24/05/2024', doctor: 'Maluma Baby', estado: 'Activo' },
  { nombre: 'Sergio Mesa', cc: '1253355', fechaOrden: '24/05/2024', doctor: 'Maluma Baby', estado: 'No Activo' },
  { nombre: 'Fernando Vega', cc: '1253355', fechaOrden: '24/05/2024', doctor: 'Blessd', estado: 'Activo' },
  { nombre: 'Alex Montañez', cc: '1253355', fechaOrden: '24/05/2024', doctor: 'J Balvin', estado: 'No Activo' },
]);

const ordenesFiltradas = ref([]); // Nueva propiedad para almacenar órdenes filtradas

// Función para filtrar las órdenes médicas por CC
const buscarPorCC = () => {
  ordenesFiltradas.value = ordenesMedicas.value.filter(orden => orden.cc.includes(busqueda.value));
};

// Al montar el componente, inicializar las órdenes filtradas
onMounted(() => {
  ordenesFiltradas.value = ordenesMedicas.value;
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex flex-1 overflow-hidden">
      <!-- Contenido principal con Órdenes Médicas -->
      <div class="flex-1 p-10 bg-gray-100 overflow-y-auto">
        <h2 class="text-3xl font-bold mb-6 text-blue-600">Órdenes Médicas</h2>
        
        <!-- Campo de búsqueda -->
        <div class="mb-6 flex items-center">
          <label for="buscar" class="block text-sm font-medium text-gray-700 mb-2 mr-2">Buscar por CC</label>
          <input type="text" id="buscar" v-model="busqueda" placeholder="1214123455" class="w-full p-2 border border-gray-300 rounded-md">
          <button 
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            @click="buscarPorCC"
          >
            Buscar
          </button>
        </div>

        <!-- Tabla de Órdenes Médicas -->
        <table class="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead class="bg-gray-200 text-gray-700">
            <tr>
              <th class="py-3 px-4 text-left">Nombre</th>
              <th class="py-3 px-4 text-left">CC</th>
              <th class="py-3 px-4 text-left">Fecha Orden</th>
              <th class="py-3 px-4 text-left">Doctor asignado</th>
              <th class="py-3 px-4 text-left">Estado</th>
              <th class="py-3 px-4 text-left">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(orden, index) in ordenesFiltradas" :key="index" class="border-b border-gray-200 hover:bg-gray-100">
              <td class="py-3 px-4">{{ orden.nombre }}</td>
              <td class="py-3 px-4">{{ orden.cc }}</td>
              <td class="py-3 px-4">{{ orden.fechaOrden }}</td>
              <td class="py-3 px-4">{{ orden.doctor }}</td>
              <td class="py-3 px-4">
                <span :class="orden.estado === 'Activo' ? 'text-green-600' : 'text-red-600'">
                  {{ orden.estado }}
                </span>
              </td>
              <td class="py-3 px-4">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                  VER
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

     
    </div>
  </div>
</template>

<style scoped>
/* Animaciones */
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

/* Estilos adicionales */
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
.overflow-y-auto {
  scrollbar-width: none; /* Para Firefox */
  -ms-overflow-style: none; /* Para Internet Explorer y Edge */
}

.overflow-y-auto::-webkit-scrollbar {
  display: none; /* Para Chrome, Safari y Opera */
}
</style>
