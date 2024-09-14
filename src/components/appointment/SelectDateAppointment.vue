<script setup lang="ts">
import { ref } from 'vue'
import { Calendar } from 'v-calendar'
import VueTimepicker from 'vue3-timepicker'
import 'v-calendar/style.css'
import 'vue3-timepicker/dist/VueTimepicker.css'

const selectedDate = ref(new Date())
const startTime = ref('09:00')
const selectedDoctor = ref('')

// Lista de doctores (puedes cargar esto dinámicamente desde una API si lo necesitas)
const doctors = [
  { id: 1, name: 'Dr. Juan Pérez' },
  { id: 2, name: 'Dra. María González' },
  { id: 3, name: 'Dr. Carlos Rodríguez' },
  { id: 4, name: 'Dra. Ana Martínez' },
]
</script>

<template>
  <div class="w-full h-full px-14">
    <div class="flex flex-wrap w-full h-full justify-center items-center">
      <div id="calendar" class="flex h-2/3 w-3/5 p-4 align-center justify-center">
        <Calendar
            v-model="selectedDate"
            :attributes="[{ highlight: true, dates: new Date() }]"
            is-expanded
            :columns="2"
        />
      </div>
      <div class="flex flex-col h-full w-2/5 space-y-8 justify-center">
        <div class="flex flex-col">
          <div class="text-3xl font-bold mb-2">
            Hora de inicio
          </div>
          <VueTimepicker v-model="startTime" format="HH:mm" />
        </div>
        <div class="flex flex-col">
          <div class="text-3xl font-bold mb-2">
            Especialista
          </div>
          <select
              v-model="selectedDoctor"
              class="doctor-select"
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

<style>
.vc-container {
  height: 100%;
}

.vue__time-picker input.display-time {
  font-size: 1.5rem;
  padding: 0.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  width: 150px;
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
  font-size: 1rem;
  padding: 0.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  width: 80%;
  background-color: white;
  cursor: pointer;
}

.doctor-select:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}
</style>