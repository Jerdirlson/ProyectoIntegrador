<script setup lang="ts">

</script>

<template>
  <div class="flex h-full">
    <ul class="flex pr-8 space-x-4 justify-center items-center gap-7">
      <li><a href="#" class="hover:text-gray-700">Home</a></li>
      <li><a href="#" class="hover:text-gray-700">About</a></li>
      <li><a href="#" class="hover:text-gray-700">Services</a></li>
      <li><a href="#" class="hover:text-gray-700">Contact</a></li>
    </ul>

    <div id="image-user" class="flex items-center">
      <div class="skeleton rounded-full bg-gray-300 w-10 h-10"></div>
    </div>
  </div>
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