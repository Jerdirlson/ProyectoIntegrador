<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";

const services = ref([
  {
    specialtyId: 1,
    name: 'Medicina General',
    type: 'general',
    services: [
      'Consultas de Medicina General',
      'Exámenes físicos',
      'Evaluaciones Preventivas y de Salud',
      'Manejo de Enfermedades Crónicas',
      'Consejería en Estilo de Vida y Prevención de Enfermedades',
      'Vacunación',
      'Procedimientos Menores de Medicina General',
      'Manejo de Enfermedades Comunes',
    ]
  },
  {
    specialtyId: 2,
    name: 'Emergencias',
    type: 'emergency',
    services: [
      'Atención de Urgencias y Emergencias Mayores',
      'Atención de Urgencias y Emergencias Menores',
      'Atención de Urgencias y Emergencias Medias'
    ]
  },
  {
    specialtyId: 3,
    name: 'Laboratorios',
    type: 'laboratory',
    services: [
      'Examen de sangre',
      'Examen de Orina',
      'Examen de Heces',
      'Examen de alergias',
      'Exámenes función hepática',
      'Glucosa',
      'Examen de perfil Hormonal'
    ]
  },
  {
    specialtyId: 4,
    name: 'Imágenes Diagnósticas',
    type: 'diagnostic',
    services: [
      'Radiografías',
      'Ecografías',
      'Ecocardiogramas',
      'Ultrasonidos',
      'Densitometría ósea',
      'Electroencefalograma',
      'Resonancias magnéticas'
    ]
  }
]);

const route = useRoute();
const type = ref('');
const selectedSpecialtyServices = ref(null);

const emit = defineEmits(['update:services']);

const updateServices = () => {
  type.value = route.query.type as string || '';
  console.log('Type updated:', type.value);

  const matchingSpecialty = services.value.find(service => service.type.toLowerCase() === type.value);
  console.log('Matching Specialty:', matchingSpecialty);

  if (matchingSpecialty) {
    selectedSpecialtyServices.value = matchingSpecialty;
    emit('update:services', matchingSpecialty.services);
  }
};

onMounted(updateServices);
</script>

<template>
  <div class="flex flex-col items-center w-full max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Seleccione el Servicio</h2>
    <div v-if="selectedSpecialtyServices" class="w-full space-y-2">
      <p class="text-2xl font-semibold">{{ selectedSpecialtyServices.name }}</p>
      <ul>
        <li v-for="service in selectedSpecialtyServices.services" :key="service">
          <label class="text-xl">
            <input type="checkbox" :value="service" class="mr-2" />
            {{ service }}
          </label>
        </li>
      </ul>
    </div>
  </div>
</template>
