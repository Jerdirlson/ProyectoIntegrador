<script setup lang="ts">
import { ref } from 'vue'
import { Calendar } from 'v-calendar'
import VueTimepicker from 'vue3-timepicker'
import 'v-calendar/style.css'
import 'vue3-timepicker/dist/VueTimepicker.css'

const selectedDate = ref(new Date())
const startTime = ref('09:00')
const selectedDoctor = ref('')

const doctors = [
  { id: 1, name: 'Dr. Juan Pérez' },
  { id: 2, name: 'Dra. María González' },
  { id: 3, name: 'Dr. Carlos Rodríguez' },
  { id: 4, name: 'Dra. Ana Martínez' },
]
</script>

<template>
  <div class="w-full h-full p-8">
    <div class="flex flex-col lg:flex-row w-full h-full justify-center items-start space-y-8 lg:space-y-0 lg:space-x-12">
      <div id="calendar" class="w-full lg:w-3/5 p-4">
        <Calendar
          v-model="selectedDate"
          :attributes="[{ highlight: true, dates: new Date() }]"
          is-expanded
          :columns="2"
          class="calendar-container"
        />
      </div>
      <div class="flex flex-col w-full lg:w-2/5 space-y-12">
        <div class="flex flex-col">
          <h2 class="text-2xl font-bold mb-4">Hora de inicio</h2>
          <VueTimepicker v-model="startTime" format="HH:mm" class="w-full max-w-xs" />
        </div>
        <div class="flex flex-col">
          <h2 class="text-2xl font-bold mb-4">Especialista</h2>
          <select
            v-model="selectedDoctor"
            class="doctor-select w-full max-w-xs"
          >
            <option value="" disabled>Seleccione un doctor</option>
            <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
              {{ doctor.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar-container {
  height: 500px; /* Ajusta según necesites */
}

.vue__time-picker input.display-time {
  font-size: 1.25rem;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  width: 100%;
}

.vue__time-picker .dropdown {
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
}

.vue__time-picker .dropdown ul li:not(:last-child) {
  border-bottom: 1px solid #e2e8f0;
}

.vue__time-picker .dropdown ul li:hover {
  background-color: #edf2f7;
}

.doctor-select {
  font-size: 1.25rem;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  background-color: white;
  cursor: pointer;
}

.doctor-select:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}
</style>