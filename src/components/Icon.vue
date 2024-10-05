<template>
  <div class="material-icons-outlined select-none" v-if="true">
    {{ props.icon}}
  </div>
  <div v-else>
    **
  </div>
</template>

<script setup lang="ts">

export interface contentIcon {
  icon: string
}
const props = defineProps<contentIcon>()
</script>

<style>
.xs-font-size .material-icons-outlined{
  font-size: 18px !important;
}
</style>
