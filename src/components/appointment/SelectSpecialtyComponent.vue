<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import {useRoute, useRouter} from "vue-router";

const specialties = ref([
  { id: 1, name: 'Medicina General', type: 'general' },
  { id: 2, name: 'Emergencias', type: 'emergency' },
  { id: 3, name: 'Laboratorios', type: 'laboratory' },
  { id: 4, name: 'Imágenes Diagnósticas', type: 'diagnostic' },
]);

const route = useRoute();
const router = useRouter();
const type = ref('');
const selectedSpecialty = ref(null);

const emit = defineEmits(['update:specialty']);

const updateType = () => {
  type.value = route.query.type as string || '';

  const matchingSpecialty = specialties.value.find(specialty => specialty.type === type.value);

  if (matchingSpecialty) {
    selectedSpecialty.value = matchingSpecialty;
    emit('update:specialty', matchingSpecialty);
  }
};

const selectSpecialty = (specialty) => {
  selectedSpecialty.value = specialty;
  emit('update:specialty', specialty);

  router.push({
    query: { ...route.query, type: specialty.type }
  });
};

watch(() => route.query.type, (newType) => {
  if (newType) {
    updateType();
  }
});

onMounted(updateType);
</script>


<template>
  <div class="flex flex-col items-center w-full max-w-md mx-auto">
    <h2 class="text-2xl font-bold mb-4">Seleccione la Especialidad de VitaMed IPS-Medicina General</h2>
    <div class="w-full space-y-2">
      <div v-for="specialty in specialties" :key="specialty.id" class="flex items-center">
        <input
            type="radio"
            :id="'specialty-' + specialty.id"
            :value="specialty"
            v-model="selectedSpecialty"
            @change="selectSpecialty(specialty)"
            class="mr-2"
        />
        <label :for="'specialty-' + specialty.id">{{ specialty.name }}</label>
      </div>
    </div>
  </div>
</template>
