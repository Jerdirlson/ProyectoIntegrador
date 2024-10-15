<template>
    <div class="motivo-container">
      <div class="motivo-title-container">
        <h2 class="motivo-title">MOTIVO</h2>
      </div>
      <div class="motivo-content">
        <br>
        <h3>"Cuidamos de ti, cerca y con calidad."</h3>
        <br>
        <p>
          En IPS Vitamed, nuestra prioridad es tu salud. Nos esforzamos por ofrecer atención médica cercana, personalizada y basada en altos estándares de calidad. Innovamos constantemente para brindarte servicios modernos, accesibles y confiables, manteniendo siempre un enfoque humano. Nuestro compromiso es tu bienestar.
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Motivo',
  };
  </script>
  
  <style scoped>
  .motivo-container {
    background-color: #007bff; /* Color de fondo azul */
    padding: 20px; /* Espaciado interno */
    border-radius: 8px; /* Bordes redondeados opcionales */
    height: 100%; /* Ocupar todo el alto de la sección */
    width: 100%; /* Ocupar todo el ancho de la sección */
    display: flex;
    flex-direction: column;
    justify-content: center; /* Centrar verticalmente el contenido */
  }
  
  .motivo-title-container {
    margin-top: 20px; /* Espacio superior para bajar el título */
  }
  
  .motivo-title {
    color: black; /* Color del texto del título */
    text-align: left; /* Título alineado a la izquierda */
    margin-bottom: 10px; /* Espacio debajo del título */
    font-size: 2rem; /* Tamaño del título más grande */
    background-color: white; /* Fondo blanco para el título */
    border: 2px solid white; /* Borde blanco alrededor del título */
    padding: 10px; /* Espaciado interno del título */
    display: inline-block; /* Para que el borde se ajuste al tamaño del texto */
  }
  
  .motivo-content {
    text-align: center; /* Centrar texto */
    font-size: 1.2rem; /* Tamaño de fuente */
    color: white; /* Color del texto en el párrafo */
  }
  
  .motivo-content h3 {
    margin-bottom: 10px; /* Espacio entre el h3 y el párrafo */
  }
  
  .motivo-content p {
    margin-top: 0; /* Asegúrate de que el párrafo esté justo debajo del h3 */
  }
  </style>
  