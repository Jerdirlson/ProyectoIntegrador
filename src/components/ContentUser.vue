<script setup lang="ts">
import { ref } from 'vue';
import LoginModal from "@/components/Loggin/LoginModal.vue";

const isVisible = window.location.pathname !== '/';
const isLoginVisible = ref(false);

const openLoginModal = () => {
  isLoginVisible.value = true;
};

const closeLoginModal = () => {
  isLoginVisible.value = false;
};
</script>

<template>
  <div class="flex h-full ">
    <ul class="flex pr-8 space-x-4 justify-center items-center gap-7">
      <li><a href="#" class="hover:text-gray-700">Home</a></li>
      <li><a href="#" class="hover:text-gray-700">About</a></li>
      <li><a href="#" class="hover:text-gray-700">Services</a></li>
      <li><a href="#" class="hover:text-gray-700">Contact</a></li>
    </ul>

    <div v-if="isVisible" id="image-user" class="flex flex-wrap items-center h-full w-1/6">
      <div class="flex h-3/4 w-full items-center justify-center">
        <a href="#" @click="openLoginModal" class="flex skeleton rounded-full bg-gray-300 w-10 h-10" ></a>
<!--        <img class="flex" src="/svg/chevron-direction-bottom-icon.svg" alt="icon"/>-->
      </div>
    </div>
  </div>
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
