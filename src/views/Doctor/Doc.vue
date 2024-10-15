<script setup lang="ts">
import SidebarDoc from '@/layouts/SidebarDoc.vue';
import Citas from '@/components/doctor/AppointmentDay.vue';
import Header from '@/layouts/HeaderDoc.vue';
import Footer from '@/layouts/FooterDoc.vue';
</script>

<template>
  <div class="flex flex-col">
    <main id="main-content">
      <section class="content">
        <div class="citas-section">
          <Citas />
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
#main-content {
  display: flex;
  flex-grow: 1;
  margin-top: 60px; 
}

section.content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-right: 250px;
}

.citas-section {
  flex-grow: 1;
}

.next-appointment-section {
  flex-grow: 1;
}

header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  background-color: #f5f7fa;
  z-index: 998; 
}

footer {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #f5f5f5;
  color: #333;
  text-align: left;
  padding: 10px 20px;
  font-size: 14px;
  border-top: 1px solid #ddd;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
  z-index: 998;
}
</style>
