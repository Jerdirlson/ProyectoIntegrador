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
