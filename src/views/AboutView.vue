<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import About from '@/components/BackgroundCover/About.vue'
import history from '@/components/carouselHistory/history.vue'
import Mision from '@/components/BackgroundCover/Mision.vue';
import Motivo from '@/components/BackgroundCover/Motivo.vue';
import Objetivo from '@/components/BackgroundCover/Objetivo.vue';
</script>

<template>
  <main>
    <MainLayout>
      <section class="section">
        <About />
        <div class="flex absolute h-14 w-96 bg-primary -left-6 top-[750px] rounded-3xl justify-center items-center">
          <p class="text-2xl font-bold text-neutral-200">
            Información
          </p>
        </div>
      </section>
      <section class="section">
        <history />
      </section>
      <hr class="divider" />
      <section class="section">
        <Mision />
      </section>
      <section class="section"> 
        <Motivo />
      </section>
      <section class="section">
        <Objetivo />
      </section>
      <section class="section map-info-section">
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d36312.29144946085!2d-73.11349373586181!3d7.032532002111985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6840b36653b9c5%3A0x4dcdbc55842151df!2sUniversidad%20Pontificia%20Bolivariana%20Seccional%20Bucaramanga!5e0!3m2!1ses!2sco!4v1729312373927!5m2!1ses!2sco"
            width="600" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>

        <div class="info-container">
          <h2>Ubica nuestras sedes</h2>
          <p>IPS VITAMED tiene sus sedes ubicadas estratégicamente en Bucaramanga, asegurando que nuestros pacientes puedan acceder fácilmente a servicios médicos de alta calidad. Nuestras instalaciones están diseñadas para ofrecer comodidad, seguridad y un ambiente acogedor en cada visita.</p>
          <p><strong>Sede Principal:</strong> Calle 36 #27-45<br />
          Barrio Cabecera, Bucaramanga<br />
          <strong>Teléfono:</strong> (7) 652-1234<br />
          <strong>Horario de atención:</strong> Lunes a Viernes, 7:00 a.m. - 6:00 p.m.</p>
        </div>
      </section>
      <section class="section">
        <div class="contact-section">
    <h2>Contáctanos</h2>
    <p>¿Tienes dudas sobre algún tema? Te invitamos a llamar o enviar un correo electrónico para más ayuda.</p>

    <div class="contact-info">
      <div class="phone-info">
        <p>Al teléfono gratuito de servicio al ciudadano:</p>
        <p><strong>+57 607 578 4980</strong></p>
        <p><strong>+57 607 578 4980</strong></p>
      </div>

      <div class="email-info">
        <p>Queremos escucharte, si tienes felicitaciones, quejas o reclamos escríbenos al</p>
        <p><a href="mailto:serviciocliente@saludpro.ips.com">serviciocliente@saludpro.ips.com</a></p>
      </div>
    </div>
  </div>
      </section>
    </MainLayout>
  </main>
</template>

<style scoped>

.divider {
  border: none; /* Quita el borde predeterminado */
  height: 60px; /* Altura de la línea */
  background-color: #007BFF; /* Color de la línea */
  margin: 20px 0; /* Espaciado arriba y abajo de la línea */
}

.section {
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
}

.map-info-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007BFF;
  padding: 40px;
  gap: 70px;
}


.map-container {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.info-container {
  width: 45%;
  color: white;
  padding-left: 20px;
  font-family: Arial, sans-serif;
}

.info-container h2 {
  font-size: 2rem;
  font-weight: bold;
}

.info-container p {
  font-size: 1.1rem;
  margin: 10px 0;
  line-height: 1.8; /* Incrementa la separación entre líneas */
}

.contact-section {
  font-family: Arial, sans-serif;
}

.contact-info {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.phone-info,
.email-info {
  width: 45%;
}

p {
  margin: 5px 0;
}

a {
  color: blue;
  text-decoration: underline;
}

.section {
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>
