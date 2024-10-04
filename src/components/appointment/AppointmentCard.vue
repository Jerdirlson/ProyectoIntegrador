<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/UseAuth";
import LoginModal from "@/components/Loggin/LoginModal.vue";

interface AppointmentCardProps {
  categoria: string;
  servicios: string[];
  accion: string;
  href: string;
}

const props = defineProps<AppointmentCardProps>();
const router = useRouter();
const { isAuthenticated } = useAuth();

const isLoginModalVisible = ref(false);

const goToLink = () => {
  console.log('hola', isAuthenticated.value)
  if (isAuthenticated.value) {
    router.push({ name: 'appointment', query: { type: props.href.split('=')[1] } });
  } else {
    isLoginModalVisible.value = true;
  }
};

const closeLoginModal = () => {
  isLoginModalVisible.value = false;
};

const onLoginSuccess = () => {
  closeLoginModal();
  router.push({ name: 'appointment', query: { type: props.href.split('=')[1] } });
};
</script>

<template>
  <article class="flex h-full flex-col w-40 2xl:w-72 xl:w-60 lg:w-52 sm:w-48 justify-center">
    <div class="flex flex-col w-full h-5/6 rounded-3xl backdrop-blur-2xl shadow-2xl">
      <div class="flex flex-col h-5/6 w-full bg-neutral-100 rounded-t-3xl">
        <div class="flex w-full h-1/6 justify-center items-center">
          <h1 class="w-5/6 text-xl font-bold">
            {{ categoria }}
          </h1>
        </div>
        <div class="flex w-full h-5/6 overflow-auto px-4 pt-1">
          <ul class="list-disc pl-5">
            <li v-for="(servicio, index) in servicios" :key="index" class="text-sm text-gray-600">
              {{ servicio }}
            </li>
          </ul>
        </div>
      </div>
      <div class="flex h-1/6 w-full bg-gradient-to-r from-green-500 to-teal-500 rounded-b-3xl">
        <button class="flex h-full w-full justify-center items-center" @click="goToLink">
          <p class="text-white font-bold text-lg">{{ accion }}</p>
        </button>
      </div>
    </div>
  </article>

  <LoginModal
      v-if="isLoginModalVisible"
      :isVisible="isLoginModalVisible"
      @close="closeLoginModal"
      @login-success="onLoginSuccess"
  />
</template>
