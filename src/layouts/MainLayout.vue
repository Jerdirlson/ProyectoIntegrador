<script setup lang="ts">
import Header from '@/layouts/Header.vue'
import Footer from '@/layouts/Footer.vue'
import Toast from '@/components/Toast.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <div class="flex-1">
      <slot></slot>
    </div>
    <Footer />
  </div>
  <Toast />
</template>
