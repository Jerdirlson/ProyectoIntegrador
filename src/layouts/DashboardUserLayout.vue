<script setup lang="ts">

import Footer from "@/layouts/Footer.vue";
import TopbarNoLogin from "@/layouts/TopbarNoLogin.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TopbarNoLogin />
    <div class="bg-container bg-neutral-300 h-[calc(100vh-10rem)] flex justify-center items-center opacity-60">
      <div class="flex w-full h-full justify-center items-center">
        <slot></slot>
      </div>
    </div>
    <Footer />
  </div>
</template>