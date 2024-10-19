<template>
    <div class="objectives-container">
      <h2 class="objectives-title">OBJETIVOS</h2>
      <div class="objective">
        <span class="objective-number">1.</span>
        <p>Brindar atención médica de calidad que responda a las necesidades de nuestros pacientes, garantizando un enfoque humano y personalizado.</p>
      </div>
      <div class="objective">
        <span class="objective-number">2.</span>
        <p>Promover la salud preventiva mediante campañas educativas y programas de concientización dirigidos a la comunidad, ayudando a prevenir enfermedades y mejorar la calidad de vida.</p>
      </div>
      <div class="objective">
        <span class="objective-number">3.</span>
        <p>Innovar en los servicios de salud a través del uso de tecnologías digitales, como la telemedicina y la gestión en línea de citas y resultados, facilitando el acceso a nuestros servicios.</p>
      </div>
      <div class="objective">
        <span class="objective-number">4.</span>
        <p>Fomentar el desarrollo continuo de nuestro equipo médico y administrativo, asegurando que cada profesional esté capacitado con los más altos estándares de atención y las últimas tendencias en medicina.</p>
      </div>
      <div class="objective">
        <span class="objective-number">5.</span>
        <p>Expandir nuestra infraestructura para atender a un mayor número de pacientes, manteniendo la calidad y eficiencia en cada una de nuestras sedes.</p>
      </div>
      <div class="objective">
        <span class="objective-number">6.</span>
        <p>Consolidar alianzas con instituciones locales para mejorar el alcance de nuestras campañas de salud pública y ofrecer más beneficios a las comunidades más vulnerables.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Objectives',
  };
  </script>
  
  <style scoped>
  .objectives-container {
    padding: 20px;
    background-color: #f2f2f2; /* Color de fondo suave */
    border-radius: 8px; /* Bordes redondeados */
    max-width: 800px; /* Ancho máximo del contenedor */
    margin: 0 auto; /* Centrar horizontalmente */
  }
  
  .objectives-title {
    text-align: left; /* Alinear título a la izquierda */
    font-size: 2rem; /* Tamaño del título */
    margin-bottom: 20px; /* Espacio debajo del título */
  }
  
  .objective {
    background-color: #007bff; /* Color de fondo azul */
    color: white; /* Color del texto */
    padding: 15px; /* Espaciado interno */
    border-radius: 5px; /* Bordes redondeados */
    margin-bottom: 10px; /* Espacio entre objetivos */
    display: flex; /* Usar flexbox para alineación */
    align-items: center; /* Alinear verticalmente */
    transition: background-color 0.3s ease; /* Transición suave para el color de fondo */
  }
  
  /* Efecto hover */
  .objective:hover {
    background-color: #3399ff; /* Color más claro al pasar el cursor */
  }
  
  .objective-number {
    font-weight: bold; /* Negrita para el número */
    margin-right: 10px; /* Espacio a la derecha del número */
    font-size: 1.5rem; /* Tamaño del número */
  }
  </style>
  