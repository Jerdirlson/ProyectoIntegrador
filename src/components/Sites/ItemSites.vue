<script setup lang="ts">
import {useRouter} from "vue-router";

interface ServiceCardProps {
  title: string;
  summary: string;
  img: string;
  nameSpace: string;
}

const props = defineProps<ServiceCardProps>();
const router = useRouter();

const goToLink = () => {
  router.push({name: props.nameSpace});
};

</script>

<template>
  <article class="relative flex h-auto flex-col w-40 2xl:w-72 xl:w-60 lg:w-52 sm:w-48">
    <div class="h-40 2xl:h-72 xl:h-60 lg:h-52 sm:h-48 w-full">
      <img :src="img" class="h-full w-full object-cover rounded-xl" />
    </div>
    <div
        class="relative group duration-500 overflow-hidden cursor-pointer group h-auto mx-2 px-4 py-10 -translate-y-10 flex flex-col items-center justify-center rounded-xl bg-white bg-clip-border text-gray-700 hover:duration-700 shadow-md text-sm 2xl:text-xl xl:text-lg lg:text-base"
        @click="goToLink"
    >
      <div class="flex flex-col items-center gap-2">
        <h1 class="text-[#0B2D64] font-bold text-center">{{ title }}</h1>
        <p class="hidden sm:block text-center">{{ summary }}</p>
      </div>
      <div
          class="absolute -z-10 bg-secondary -bottom-full h-full w-full p-3 flex flex-col gap-1 group-hover:bottom-0 group-hover:duration-600 duration-500"
      />
    </div>
  </article>
</template>
