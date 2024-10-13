
<script>
import { Chart, registerables } from 'chart.js';
import { obtenerResumenFinanciero } from '../../service/Adminservice'; // Asegúrate de usar la ruta correcta

export default {
  data() {
    return {
      financialSummary: [],
    };
  },
  async mounted() {
    // Registra los elementos de Chart.js
    Chart.register(...registerables);
    
    // Obtiene los datos de la API
    await this.fetchFinancialSummary();
    
    // Crea la gráfica al montar el componente
    this.createChart();
  },
  methods: {
    async fetchFinancialSummary() {
      try {
        const data = await obtenerResumenFinanciero();
        this.financialSummary = [
          { title: 'Ingresos Mensuales', value: `$${data.ingresosMensuales / 1000000}M`, change: 5 }, // Ajusta los cambios como necesites
          { title: 'Gastos Operativos', value: `$${data.gastosOperativos / 1000000}M`, change: -2 },
          { title: 'Margen Operativo', value: `${data.margenOperativo}%`, change: 3 }, // Ajusta el cambio si es necesario
          { title: 'Presupuesto Restante', value: `$${data.presupuestoRestante / 1000000}M`, change: -10 },
        ];
      } catch (error) {
        console.error('Error al obtener el resumen financiero:', error);
      }
    },
    createChart() {
      const ctx = document.getElementById('financialChart').getContext('2d');
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.financialSummary.map(item => item.title),
          datasets: [{
            label: 'Valores',
            data: this.financialSummary.map(item => parseFloat(item.value.replace(/[^0-9.-]+/g, ""))),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Montos (en millones)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Categorías'
              }
            }
          },
        }
      });
    }
  }
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
    <main class="container mx-auto">
      <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center animated-gradient">
        Gestión de Recursos Hospitalarios (ERP)
      </h1>

      <div class="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:shadow-2xl hover:-translate-y-2 mb-8">
        <h2 class="text-2xl font-semibold text-indigo-600 mb-4">Resumen Financiero</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(item, index) in financialSummary" :key="index" class="bg-gray-100 p-4 rounded-lg">
            <h3 class="text-lg font-semibold text-gray-700">{{ item.title }}</h3>
            <p class="text-2xl font-bold text-indigo-600">{{ item.value }}</p>
            <p :class="['text-sm', item.change >= 0 ? 'text-green-600' : 'text-red-600']">
              {{ item.change >= 0 ? '↑' : '↓' }} {{ Math.abs(item.change) }}%
            </p>
          </div>
        </div>
      </div>

      <!-- Gráfica de Resumen Financiero -->
      <div class="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:shadow-2xl mb-8">
        <h2 class="text-2xl font-semibold text-indigo-600 mb-4">Gráfica de Resumen Financiero</h2>
        <canvas id="financialChart" class="w-full h-64"></canvas>
      </div>
    </main>
  </div>
</template>



<style scoped>
.animated-gradient {
  background: linear-gradient(270deg, #3b82f6, #8b5cf6, #ec4899);
  background-size: 600% 600%;
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
