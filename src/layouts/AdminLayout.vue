<script setup lang="ts">
import {ref} from 'vue';
import {menuOperario, menuAdmin} from "@/utils/menu";
import type {menuType} from "@/utils/menu";
import {useAuth} from "@/composables/UseAuth";
import router from "@/router";

const isMenuExpanded = ref(true);

const props = defineProps<{
  type?: menuType;
}>();

const typeMenuSelected = props.type === "menuAdmin" ? menuAdmin : menuOperario;

function toggleMenu() {
  isMenuExpanded.value = !isMenuExpanded.value;
}

function salir() {
  setTimeout(() => {
    useAuth().logout();
    router.push({name: 'dashboard'});
  }, 500);
}
</script>

<template>
  <div class="flex flex-col h-screen">
    <header class="bg-gray-200 text-gray-700 p-2 flex justify-between items-center">
      <button
          class="hover:text-gray-900 transition-transform duration-300 hover:scale-105 hover:opacity-80 salir-btn flex items-center"
          @click="salir"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9V5a3 3 0 00-3-3H4a3 3 0 00-3 3v14a3 3 0 003 3h3a3 3 0 003-3v-4m5-7l5 5m0 0l-5 5m5-5H9" />
        </svg>
        Salir
      </button>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <div class="flex-1 bg-gray-100 overflow-y-auto">
        <slot></slot>
      </div>

      <!-- Menú lateral -->
      <aside
          :class="[
          'bg-blue-600 text-white flex flex-col transition-all duration-300',
          isMenuExpanded ? 'w-64 lg:w-1/5' : 'w-16'
        ]"
      >
        <div class="p-2 flex flex-col items-center">
          <img v-if="isMenuExpanded" src="/svg/LogoLetrasGrandes.svg" alt="Logo" class="h-16 mb-2" />
          <img v-else src="/svg/logoSinLetras.svg" alt="Logo Pequeño" class="h-8 mb-2" />
          <div class="flex items-start ">
            <button
                @click="toggleMenu"
                class="text-white hover:text-blue-300 transition-transform duration-300 hover:scale-105 mt-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>

        <nav class="flex-grow overflow-y-auto">
          <ul class="p-2">
            <li
                v-for="(item, index) in typeMenuSelected"
                :key="index"
                :class="[
                  'flex mb-4',
                  isMenuExpanded ? 'items-start justify-start' : 'items-center justify-center'
                ]"
            >
              <router-link
                  :to="item.route"
                  class="flex items-center hover:text-blue-300 transition-colors duration-300"
                  :title="item.name"
              >
                <component :is="item.icon" class="h-8 w-8" />
                <span v-if="isMenuExpanded" class="text-lg ml-2">{{ item.name }}</span>
              </router-link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  </div>
</template>

<style scoped>
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

.overflow-y-auto {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.overflow-y-auto::-webkit-scrollbar {
  display: none;
}

.bg-white {
  background-color: #ffffff;
}

.text-black {
  color: #000000;
}

.hover\:bg-blue-300:hover {
  background-color: #63b3ed;
}
</style>
