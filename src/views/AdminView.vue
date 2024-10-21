<script setup lang="ts">
import AdminLayout from "@/layouts/AdminLayout.vue";
</script>

<template>
  <AdminLayout :type="'menuAdmin'">
    <div class="flex justify-center items-center h-screen">
      <div class=" w-full h-full p-6 rounded shadow-lg">
      <!--  <MenuAdmin/>-->
      <router-view></router-view>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
</style>