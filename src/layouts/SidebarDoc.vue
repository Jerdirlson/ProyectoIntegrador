<script setup lang="ts">
import { ref } from 'vue';
import { Home, UserPlus, Calendar, FileText, Ambulance } from 'lucide-vue-next';

const menuItems = ref([
  { name: "Agenda", route: "/doc/citas", icon: Calendar },
  { name: "Información de pacientes", route: "/doc/docinfo", icon: UserPlus },
  { name: "Historial Medico", route: "/doc/dochistory", icon: FileText },
  { name: "Orden Medica", route: "/doc/docorder", icon: FileText },
  { name: "Emergencias", route: "/doc/docemergency", icon: Ambulance },
]);

const isMenuExpanded = ref(true);

function toggleMenu() {
  isMenuExpanded.value = !isMenuExpanded.value;
}
</script>

<template>
  <aside
    :class="[isMenuExpanded ? 'w-64' : 'w-16', 'sidebar bg-blue-600 text-white flex flex-col fixed top-0 right-0 bottom-0 z-999']"
  >
    <div class="p-2 flex flex-col items-center">
      <img v-if="isMenuExpanded" src="/svg/LogoVitamed-09.svg" alt="Logo" class="h-16 mb-2" />
      <img v-else src="/svg/logoSinLetras.svg" alt="Logo Pequeño" class="h-8 mb-2" />
      <button @click="toggleMenu" class="text-white hover:text-blue-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
    <nav class="flex-grow overflow-y-auto">
      <ul class="p-2">
        <li v-for="(item, index) in menuItems" :key="index" class="flex mb-4">
          <router-link :to="item.route" class="flex items-center hover:text-blue-300">
            <component :is="item.icon" class="h-8 w-8" />
            <span v-if="isMenuExpanded" class="text-lg ml-2">{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  transition: width 0.3s ease;
  position: fixed;
  z-index: 999;
}

.overflow-y-auto {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.overflow-y-auto::-webkit-scrollbar {
  display: none;
}
</style>
