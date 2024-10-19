<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
</script>

<template>
  <MainLayout>
    <div class="w-full h-[calc(100vh-9rem)]">
      <router-view></router-view> <!-- Renderiza las vistas hijas aquí -->
    </div>
  </MainLayout>
</template>

<style scoped>
.bg-primary {
  background-color: #1e90ff;
}
.text-neutral-200 {
  color: #f0f0f0;
}
</style>
