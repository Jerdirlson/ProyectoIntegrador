<template>
  <div class="sedes-container">
    <Header />

    <main class="pb-12">
      <!-- Sección Hero -->
      <div class="bg-blue-500 text-white py-12">
        <div class="container mx-auto px-4">
          <div class="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8">
            <!-- Texto a la izquierda (60% en pantallas grandes) -->
            <div class="lg:w-3/5">
              <h1 class="text-4xl font-bold mb-4">Nuestras instalaciones</h1>
              <p class="text-xl max-w-3xl">
                Contamos con una infraestructura propia de 60 Centros Médicos, 4 Unidades de
                Urgencias, 89 Oficinas de atención al afiliado y más de 15 mil IPS aliadas en todo
                el país, para ofrecerte una atención humanizada, cómoda, fácil y oportuna.
              </p>
              <p class="mt-4">Nuestra sede principal se encuentra en:</p>
              <p><strong>Carrera 15 # 80-50, Bogotá, Colombia</strong></p>
              <p><strong>Teléfono: +57 300 123 4567</strong></p>
            </div>
            <!-- Imagen a la derecha (40% en pantallas grandes) -->
            <div class="lg:w-2/5 mt-8 lg:mt-0">
              <img src="/images/places/centroMedico8.jpg" alt="Instalaciones" class="w-full h-64 object-cover rounded-lg shadow-lg">
            </div>
          </div>
        </div>
      </div>

      <!-- Carrusel de imágenes -->
      <div class="container mx-auto px-4 py-8">
        <h2 class="text-3xl font-bold mb-8">Centros Médicos y Oficinas</h2>
        <swiper
          :modules="swiperModules"
          :slides-per-view="1"
          :space-between="30"
          :loop="true"
          :pagination="{ clickable: true }"
          :navigation="true"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false,
          }"
          :breakpoints="{
            '640': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            '1024': {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }"
          class="mySwiper"
        >
          <swiper-slide v-for="(image, index) in images" :key="index">
            <img :src="image.src" :alt="image.alt" class="w-full h-48 object-cover rounded-lg shadow-md">
          </swiper-slide>
        </swiper>
      </div>

      <!-- Información de otras sedes -->
      <div class="container mx-auto px-4 py-8">
        <h2 class="text-3xl font-bold mb-4">Otras Sedes</h2>
        <div class="bg-gray-100 p-4 rounded-lg shadow-md">
          <p class="font-semibold">Sanavid:</p>
          <p>Calle 100 # 15-30, Bogotá, Colombia</p>
          <p>Teléfono: +57 300 765 4321</p>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg shadow-md mt-4">
          <p class="font-semibold">Aurea:</p>
          <p>Avenida 19 # 50-80, Bogotá, Colombia</p>
          <p>Teléfono: +57 300 852 9630</p>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg shadow-md mt-4">
          <p class="font-semibold">Prosalud:</p>
          <p>Calle 26 # 32-40, Bogotá, Colombia</p>
          <p>Teléfono: +57 300 147 2589</p>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg shadow-md mt-4">
          <p class="font-semibold">GS:</p>
          <p>Calle 72 # 14-25, Bogotá, Colombia</p>
          <p>Teléfono: +57 300 369 2587</p>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from '../../layouts/Header.vue';
import Footer from '../../layouts/Footer.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const swiperModules = [Pagination, Navigation, Autoplay];

const images = ref([
  { src: '/images/places/centroMedico1.jpg', alt: 'Centro Médico 1' },
  { src: '/images/places/centroMedico2.jpg', alt: 'Centro Médico 2' },
  { src: '/images/places/centroMedico3.jpg', alt: 'Centro Médico 3' },
  { src: '/images/places/centroMedico4.jpg', alt: 'Centro Médico 4' },
  { src: '/images/places/centroMedico5.jpg', alt: 'Centro Médico 5' },
  { src: '/images/places/centroMedico6.jpg', alt: 'Centro Médico 6' },
  { src: '/images/places/centroMedico7.jpg', alt: 'Centro Médico 7' },
  { src: '/images/places/centroMedico8.jpg', alt: 'Centro Médico 8' },
]);
</script>

<style scoped>
.sedes-container {
  @apply min-h-screen flex flex-col;
}

main {
  @apply flex-grow;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #3B82F6; /* Ajusta este color según tu esquema */
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #3B82F6; /* Ajusta este color según tu esquema */
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 24px; /* Ajusta el tamaño de las flechas si lo deseas */
}
</style>
