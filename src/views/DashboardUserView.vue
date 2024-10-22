<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
</script>

<template>
  <MainLayout>
    <div class="w-full h-full ">
      <router-view></router-view> <!-- Renderiza las vistas hijas aquí -->
    </div>
  </MainLayout>
</template>
