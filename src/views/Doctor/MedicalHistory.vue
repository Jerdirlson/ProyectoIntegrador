<script setup lang="ts">
import Header from '@/layouts/HeaderDoc.vue';
import Footer from '@/layouts/FooterDoc.vue';
import SidebarDoc from '@/layouts/SidebarDoc.vue';
import MedicalHistory from '@/components/doctor/MedicalHist.vue';
</script>

<template>
        <div class="flex flex-col min-h-screen relative">
      <main class="flex flex-1 relative">
        <div class="content-container flex-grow">
          <div class="flex justify-center items-center h-full">
            <MedicalHistory />
          </div>
        </div>
      </main>
    </div>
</template>

<style scoped>
.sidebar-container {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
}

.content-container {
  margin-right: auto;
  margin-left: auto; 
  padding-right: 10rem;
}

.flex-grow {
  flex-grow: 1;
}

</style>
