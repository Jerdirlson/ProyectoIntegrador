<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuth } from "@/composables/UseAuth";
import LoginModal from "@/components/Loggin/LoginModal.vue";

const { isAuthenticated, user, logout, checkAuth } = useAuth();

const isVisible = computed(() => window.location.pathname !== '/');
const isLoginVisible = ref(false);
const isUserMenuVisible = ref(false);

const openLoginModal = () => {
  isLoginVisible.value = true;
};

const closeLoginModal = async () => {
  isLoginVisible.value = false;
  await checkAuth();
};

const toggleUserMenu = () => {
  isUserMenuVisible.value = !isUserMenuVisible.value;
};

const handleLogout = () => {
  logout();
  isUserMenuVisible.value = false;
};

onMounted(async () => {
  await checkAuth();
});
</script>

<template>
  <nav class="flex h-full">
    <ul class="flex pr-8 space-x-4 justify-center items-center gap-7">
      <li><a href="#" class="hover:text-gray-700">Home</a></li>
      <li><a href="#" class="hover:text-gray-700">About</a></li>
      <li><a href="#" class="hover:text-gray-700">Services</a></li>
      <li><a href="#" class="hover:text-gray-700">Contact</a></li>
    </ul>

    <div v-if="isVisible" id="image-user" class="flex flex-wrap items-center h-full w-1/6 relative">
      <div class="flex h-3/4 w-full items-center justify-center">
        <button @click="isAuthenticated ? toggleUserMenu() : openLoginModal()"
                class="flex rounded-full w-10 h-10 overflow-hidden">
          <img v-if="isAuthenticated && user?.avatar" :src="user.avatar" alt="User avatar" class="w-full h-full object-cover">
          <div v-else class="skeleton bg-gray-300 w-full h-full"></div>
        </button>
      </div>

      <!-- Menú flotante de usuario -->
      <div v-if="isAuthenticated && isUserMenuVisible"
           class="absolute right-0 mt-40 w-48 bg-white rounded-md shadow-lg py-1 z-10">
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Perfil</a>
        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Configuración</a>
        <a href="#" @click="handleLogout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cerrar sesión</a>
      </div>
    </div>
  </nav>

  <LoginModal v-if="isLoginVisible" @close="closeLoginModal" />
</template>

<style scoped>
.skeleton {
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
