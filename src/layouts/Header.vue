<script setup lang="ts">
import ContentUser from '@/components/ContentUser.vue'
import Logo from '@/components/Logo.vue'
</script>

<template>
  <header id="header" class="third h-16 text-gray-900 shadow-xl">
    <nav class="flex h-full justify-between">
      <div class="w-1/6">
        <Logo />
      </div>
      <div class="flex w-5/6 justify-end pr-12">
        <ContentUser />
      </div>
    </nav>
  </header>
</template>