<script setup lang="ts">
import Header from '@/layouts/HeaderDoc.vue';
import Footer from '@/layouts/FooterDoc.vue';
import Date from '@/components/doctor/Date.vue';
import SidebarDoc from '@/layouts/SidebarDoc.vue';
import Obser from '@/components/doctor/obser.vue';
</script>

<template>
  <div class="flex flex-col">
     <main class="flex flex-1">
      <div class="content-section flex-grow">
        <Date />
        <br>
        <Obser />
      </div>
    </main>

  </div>
</template>

<style scoped>
main {
  display: flex;
  padding: 20px;
  flex: 1;
  position: relative;
}

.content-section {
  flex-grow: 1;
  padding-right: 20px;
  z-index: 1; 
}

.sidebar-section {
  width: 250px; 
  flex-shrink: 0; 
  z-index: 2; 
  position: relative;
}

.footer-section {
  z-index: 1; 
}

@media (max-width: 768px) {
  main {
    flex-direction: column;
  }

  .sidebar-section {
    width: 100%;
    padding-top: 20px;
  }
}
</style>
