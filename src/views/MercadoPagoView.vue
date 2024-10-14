<script setup lang="ts">
import AdminLayout from "@/layouts/AdminLayout.vue";
// se utliza el lyout de admin para prueba pq la idea es que utilivce uno peor dependera del lyout del modulo
</script>

<template>
  <AdminLayout>
    <div class="flex justify-center items-center h-screen">
      <div class=" w-full h-full p-6 rounded shadow-lg">
     
      <router-view></router-view>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
</style>
