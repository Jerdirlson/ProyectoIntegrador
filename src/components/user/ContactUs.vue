<template>
  <div class="contact-us-container">
    <Header />

    <main class="py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold mb-4">Contáctanos</h1>
        <p class="text-xl mb-8">
          Para cualquier tipo de información, te invitamos a acercarte a nuestra sede. Estaremos encantados de atenderte.
        </p>
        
        <div class="bg-blue-500 text-white p-6 rounded-lg shadow-md">
          <h2 class="text-3xl font-semibold mb-4">Información de Contacto</h2>
          <ul>
            <li>Teléfono: +57 300 123 4567</li>
            <li>Email: info@tuips.com</li>
            <li>Dirección: Carrera 15 # 80-50, Bogotá, Colombia</li>
          </ul>
        </div>

        <div class="mt-4">
          <h2 class="text-3xl font-semibold mb-4">Ubicación</h2>
          <div class="map-container mb-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.1440120400745!2d-74.0632704856657!3d4.641075096029052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99d2276f91e3%3A0x796168e19578f1ff!2sCarrera%2015%20%2380-50%2C%20Bogot%C3%A1!5e0!3m2!1ses-419!2sco!4v1682548694715!5m2!1ses-419!2sco"
              width="100%"
              height="250"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div class="faq-section mt-8">
          <h2 class="text-3xl font-semibold mb-4">Preguntas Frecuentes</h2>
          <div v-for="(faq, index) in faqs" :key="index" class="faq-item mb-4 border border-gray-300 rounded-lg">
            <button
              @click="faq.active = !faq.active"
              class="w-full text-left bg-blue-200 p-4 rounded-lg"
            >
              {{ faq.question }}
            </button>
            <div v-if="faq.active" class="bg-white p-4 rounded-lg">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '../../layouts/Header.vue';
import Footer from '../../layouts/Footer.vue';
import { ref } from 'vue';

const faqs = ref([
  { question: '¿Qué servicios ofrecen?', answer: 'Ofrecemos una variedad de servicios médicos, incluyendo consultas generales, emergencias y atención especializada.', active: false },
  { question: '¿Cómo puedo agendar una cita?', answer: 'Puedes agendar una cita llamándonos o visitando nuestra sede.', active: false },
  { question: '¿Tienen servicios de urgencias?', answer: 'Sí, contamos con una unidad de urgencias disponible las 24 horas.', active: false },
  { question: '¿Aceptan seguros médicos?', answer: 'Sí, trabajamos con varios seguros médicos. Consulta con nuestro personal para más detalles.', active: false },
]);
</script>

<style scoped>
.contact-us-container {
  @apply min-h-screen flex flex-col;
}

.map-container {
  @apply mb-4; /* Margen inferior para separación */
}

.faq-item {
  margin-bottom: 10px;
  cursor: pointer;
}
</style>
