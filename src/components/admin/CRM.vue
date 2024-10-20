
<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';
import { obtenerResumenCRM, obtenerCitasPorEspecialidad } from '../../service/Adminservice'; // Asegúrate de que la ruta sea correcta

// Registrar los elementos de Chart.js
Chart.register(...registerables);

// Definición de los estados
const totalCitas = ref(0);
const citasRealizadas = ref(0);
const doctorMasSolicitado = ref('');
const cantidadUsuarios = ref(0);
const servicesData = ref({
  labels: ['Medicina General', 'Emergencias', 'Laboratorios', 'Imágenes Diagnósticas'],
  data: [0, 0, 0, 0] // Inicializado con ceros
});

// Crear la gráfica
const createChart = () => {
  const ctx = document.getElementById('serviceChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: servicesData.value.labels,
      datasets: [{
        label: 'Cantidad de Citas',
        data: servicesData.value.data,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Cantidad de Citas'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Especialidades'
          }
        }
      }
    }
  });
};

const fetchData = async () => {
  try {
    // Obtener datos del resumen CRM
    const resumenData = await obtenerResumenCRM();
    totalCitas.value = resumenData.totalCitas;
    citasRealizadas.value = resumenData.citasRealizadas;
    doctorMasSolicitado.value = resumenData.doctorMasSolicitado;
    cantidadUsuarios.value = resumenData.usuariosEnSistema;

    // Obtener datos de citas por especialidad
    const citasPorEspecialidadData = await obtenerCitasPorEspecialidad();
    servicesData.value.data = [
      citasPorEspecialidadData.medicinaGeneral,
      citasPorEspecialidadData.emergencias,
      citasPorEspecialidadData.laboratorios,
      citasPorEspecialidadData.imagenesDiagnosticas
    ];

    createChart(); // Crear la gráfica después de que se obtengan los datos
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
};

onMounted(() => {
  nextTick(() => {
    fetchData(); // Obtener datos al montar el componente
  });
});
</script>



<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
    <main class="container mx-auto">
      <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center animated-gradient">
        Customer Relationship Management
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Total Citas -->
        <div class="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:shadow-2xl hover:-translate-y-2">
          <h2 class="text-2xl font-semibold text-indigo-600 mb-4">Total Citas</h2>
          <p class="text-3xl font-bold text-blue-600 animate-pulse">{{ totalCitas }}</p>
        </div>

        <!-- Citas Realizadas -->
        <div class="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:shadow-2xl hover:-translate-y-2">
          <h2 class="text-2xl font-semibold text-indigo-600 mb-4">Citas Realizadas</h2>
          <p class="text-3xl font-bold text-green-600 animate-pulse">{{ citasRealizadas }}</p>
        </div>

        <!-- Doctor Más Solicitado -->
        <div class="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:shadow-2xl hover:-translate-y-2">
          <h2 class="text-2xl font-semibold text-indigo-600 mb-4">Doctor Más Solicitado</h2>
          <p class="text-xl font-bold text-gray-800">{{ doctorMasSolicitado }}</p>
        </div>

        <!-- Cantidad de Usuarios en el Sistema -->
        <div class="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:shadow-2xl hover:-translate-y-2">
          <h2 class="text-2xl font-semibold text-indigo-600 mb-4">Usuarios en el Sistema</h2>
          <p class="text-3xl font-bold text-purple-600 animate-pulse">{{ cantidadUsuarios }}</p>
        </div>
      </div>

      <!-- Gráfica de Citas por Especialidad -->
      <div class="mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-semibold text-indigo-600 mb-4">Citas por Especialidad</h2>
        <canvas id="serviceChart" ref="serviceChart"></canvas>
      </div>
    </main>
  </div>
</template>


<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.container > * {
  animation: fadeIn 0.5s ease-out forwards;
}

.animated-gradient {
  background: linear-gradient(270deg, #3b82f6, #8b5cf6, #ec4899);
  background-size: 600% 600%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 10s ease infinite;
}

@keyframes gradientShift { 
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
