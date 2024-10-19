<template>
    <div class="line-container">
      <h2 class="historia-title">Historia</h2> 
  
      <div class="line">
        <span class="dot dot-left" @click="showText('left')"></span>
        <span class="dot dot-center" @click="showText('center')"></span>
        <span class="dot dot-right" @click="showText('right')"></span>
      </div>
  
      <div class="text-container">
        <div v-if="activeText === 'left'">
          <h3>Los Inicios de IPS Vitamed:</h3>
          <p>
            En el año 2005, en la vibrante ciudad de Bucaramanga, un grupo de médicos comprometidos con la atención médica de calidad fundó IPS Vitamed. Nació con la misión de ofrecer servicios de salud accesibles y de alto nivel para toda la comunidad santandereana. Desde su modesto inicio, Vitamed se destacó por su enfoque en el bienestar del paciente y la calidad de su servicio, brindando atención integral y personalizada.
          </p>
        </div>
        <div v-if="activeText === 'center'">
          <h3>Innovación en Salud Digital:</h3>
          <p>
            En 2015, Vitamed dio un salto tecnológico al implementar su plataforma de atención digital. Este sistema innovador ofrecía a los pacientes la posibilidad de agendar citas en línea, acceder a sus resultados clínicos y recibir atención a distancia mediante telemedicina. Esta transformación digital no solo facilitó el acceso a la salud, sino que posicionó a Vitamed como un líder en la atención médica moderna en la región.
          </p>
        </div>
        <div v-if="activeText === 'right'">
          <h3>Un Futuro de Innovación y Excelencia:</h3>
          <p>
            Hoy en día, Vitamed sigue creciendo, fiel a su misión de brindar atención de calidad. Con múltiples sedes, un equipo médico altamente capacitado y una constante inversión en tecnología, la IPS continúa marcando el rumbo en el cuidado de la salud en la región. El futuro de Vitamed está marcado por su visión de innovar en salud sin perder el toque humano que la ha caracterizado desde sus inicios.
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeText: 'left',
      };
    },
    methods: {
      showText(position) {
        this.activeText = position; 
      },
    }
  };
  </script>
  
  <style scoped>
  .line-container {
    display: flex;
    flex-direction: column;
    align-items: center; /* Mantener elementos centrados */
  }
  
  .historia-title {
    font-size: 2rem; /* Tamaño del título */
    color: black; /* Color del texto */
    margin: 20px 0; /* Espacio arriba y abajo del título */
    text-align: left; /* Alinear el texto a la izquierda */
    width: 100%; /* Ocupar todo el ancho disponible */
    margin-left: 10px; /* Mover el título un poco más a la derecha */
    font-weight: bold; /* Poner el texto en negrita */
  }
  
  .line {
    width: 70%;
    height: 2px;
    background-color: gray;
    position: relative;
    margin-top: 10px; /* Espacio entre el título y la línea */
  }
  
  .dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    top: -9px;
    cursor: pointer;
  }
  
  .dot-left {
    background-color: orange;
    left: 0;
  }
  
  .dot-center {
    background-color: blue;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .dot-right {
    background-color: green;
    right: 0;
  }
  
  .text-container {
    margin-top: 60px; /* Incrementa el margen superior para mayor separación */
    text-align: center; /* Centrar el texto */
    width: 70%; /* Ancho del 70% de la pantalla */
    margin: 0 auto; /* Centrar el contenido horizontalmente */
    padding-top: 70px; /* Añade espacio interno arriba del texto */
  }
  </style>
  