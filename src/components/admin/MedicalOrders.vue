<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { obtenerOrdenesMedicas } from '../..//service/Adminservice'; // Asegúrate de que la ruta sea correcta

// Variables reactivas
const busqueda = ref('');
const ordenesMedicas = ref([]);
const ordenesFiltradas = ref([]); // Nueva propiedad para almacenar órdenes filtradas
const mensajeError = ref(''); // Mensaje de error

// Función para buscar órdenes médicas por cédula
const buscar = async () => {
  try {
    if (busqueda.value.trim() === '') {
      console.error('Por favor, ingrese una cédula o ID.');
      mensajeError.value = 'Por favor, ingrese una cédula o ID.'; // Mostrar mensaje de error
      return; // Salir si el campo de búsqueda está vacío
    }

    // Limpiar las órdenes y el mensaje de error antes de buscar
    ordenesMedicas.value = [];
    mensajeError.value = '';

    // Usar el servicio importado
    const datos = await obtenerOrdenesMedicas(busqueda.value); // Asegúrate de que esta función esté definida en tu servicio

    // Verificar si se encontraron datos
    if (datos.length === 0) {
      mensajeError.value = 'No se encontraron órdenes médicas para la búsqueda.'; // Mostrar mensaje si no hay resultados
      setTimeout(() => {
        mensajeError.value = ''; // Desaparece el mensaje después de 3 segundos
      }, 3000); // 3000 ms
      return;
    }

    // Mapear los datos devueltos a la estructura deseada
    ordenesMedicas.value = datos.map((item) => ({
      idOrdenMedica: item['idOrden_Medica'], // Agregar idOrdenMedica
      nombre: item['nombre'],
      cc: item['cc'],
      fechaOrden: new Date(item['fechaOrden']).toLocaleDateString(),
      doctor: item['doctorAsignado'],
      estado: item['estado']
    }));
    ordenesFiltradas.value = ordenesMedicas.value; // Actualiza las órdenes filtradas

  } catch (error) {
    console.error('Error al buscar órdenes médicas:', error);
    mensajeError.value = 'Ocurrió un error al buscar las órdenes médicas.'; // Mostrar mensaje de error
  }
};

// Al montar el componente, inicializar las órdenes
onMounted(() => {
  // Puedes agregar una llamada a obtenerOrdenesMedicas() aquí si deseas cargar todas las órdenes al inicio
});
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex flex-1 overflow-hidden">
      <div class="flex-1 p-10 bg-gray-100 overflow-y-auto">
        <h2 class="text-3xl font-bold mb-6 text-blue-600">Órdenes Médicas</h2>
        
        <div class="mb-6 flex items-center">
          <label for="buscar" class="block text-sm font-medium text-gray-700 mb-2 mr-2">Buscar por CC</label>
          <input type="text" id="buscar" v-model="busqueda" placeholder="1214123455" class="w-full p-2 border border-gray-300 rounded-md">
          <button 
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            @click="buscar"
          >
            Buscar
          </button>
        </div>

        <div v-if="mensajeError" :class="{'fade-out': mensajeError && !ordenesFiltradas.length}" class="error-message">{{ mensajeError }}</div>

        <table class="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead class="bg-gray-200 text-gray-700">
            <tr>
              <th class="py-3 px-4 text-left">ID Orden Médica</th>
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
              <td class="py-3 px-4">{{ orden.idOrdenMedica }}</td>
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
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-10px);
    }
}

.error-message {
    animation: fadeIn 0.5s ease-in-out forwards;
    background-color: #ffcccb; /* Color de fondo suave */
    border: 1px solid #f44336; /* Borde rojo */
    border-radius: 5px; /* Esquinas redondeadas */
    padding: 10px;
    margin-bottom: 10px;
    color: #f44336; /* Texto rojo */
}

.fade-out {
    animation: fadeOut 0.5s ease-in-out forwards;
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
