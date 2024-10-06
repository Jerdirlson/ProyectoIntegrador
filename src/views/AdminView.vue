<script setup lang="ts">
import AdminLayout from "@/layouts/AdminLayout.vue";
import MenuAdmin from "@/components/admin/ME.vue";
</script>

<template>
  <AdminLayout>
    <div class="flex justify-center items-center h-screen">
      <div class=" w-full h-full p-6 rounded shadow-lg"> <!-- Ancho y alto completo -->

      <!--  <MenuAdmin/>-->
      <router-view></router-view>

        
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
</style>
