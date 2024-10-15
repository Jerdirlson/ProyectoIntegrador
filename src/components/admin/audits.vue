

<script>
import axios from 'axios';
import { obtenerAuditorias } from '../../service/Adminservice';

export default {
  data() {
    return {
      tipoAuditoria: '',
      auditorias: [],
      tiposAuditoria: [
        { value: 'factura-electronica', label: 'Factura Electrónica' },
        { value: 'colilla-pago', label: 'Colilla de Pago' },
        { value: 'historia-medica', label: 'Historia Médica' },
        { value: 'hojas-vida', label: 'Hojas de Vida' },
        { value: 'sedes', label: 'Sedes' },
        { value: 'usuarios', label: 'Usuarios' },
      ],
    };
  },
  methods: {
    async buscarAuditorias() {
      if (!this.tipoAuditoria) return;
      try {
        this.auditorias = await obtenerAuditorias(this.tipoAuditoria);
      } catch (error) {
        console.error('Error al buscar auditorías:', error);
        this.auditorias = [];
      }
    },
    formatKey(key) {
      return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    },
    formatValue(value) {
      if (value === null) return 'N/A';
      if (typeof value === 'boolean') return value ? 'Sí' : 'No';
      if (value instanceof Date) return value.toLocaleString();
      return value;
    },
  },
};
</script>


<template>
  <div class="container mx-auto p-4 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-center text-blue-600">Buscador de Auditorías</h1>
    <div class="mb-6">
      <select 
        v-model="tipoAuditoria" 
        @change="buscarAuditorias"
        class="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Seleccione un tipo de auditoría</option>
        <option v-for="tipo in tiposAuditoria" :key="tipo.value" :value="tipo.value">
          {{ tipo.label }}
        </option>
      </select>
    </div>
    <div v-if="auditorias.length" class="mt-6">
      <h2 class="text-2xl font-semibold mb-4 text-gray-700">Resultados:</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="(auditoria, index) in auditorias" 
          :key="index" 
          class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h3 class="text-lg font-semibold mb-2 text-blue-600">Auditoría #{{ index + 1 }}</h3>
          <div v-for="(value, key) in auditoria" :key="key" class="mb-2">
            <span class="font-medium text-gray-700">{{ formatKey(key) }}:</span>
            <span class="ml-2 text-gray-600">{{ formatValue(value) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="tipoAuditoria" class="mt-6 text-center text-gray-600 bg-white p-4 rounded-lg shadow">
      No se encontraron auditorías para el tipo seleccionado.
    </div>
  </div>
</template>

