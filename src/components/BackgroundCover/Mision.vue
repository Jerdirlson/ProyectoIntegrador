<template>
    <div class="mision-container">
        <div class="header">
            <div
                class="title"
                :class="{ active: isMissionActive }"
                @click="showMission"
            >
                MISION
            </div>
            <div
                class="title"
                :class="{ active: !isMissionActive }"
                @click="showVision"
            >
                VISION
            </div>
        </div>
        <div class="content">
            <p v-if="isMissionActive">{{ missionText }}</p>
            <p v-else>{{ visionText }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isMissionActive: true,
        missionText: 'Proveer atención médica primaria y preventiva de excelencia, con un enfoque integral y humano, asegurando el acceso a servicios de salud de calidad para todos los pacientes. Liderar la coordinación y la integración de procesos entre las distintas sedes, promoviendo la eficiencia y la innovación a través de la implementación de tecnologías avanzadas. Comprometernos con el bienestar y la satisfacción del paciente, ofreciendo un servicio personalizado y continuo.',
        visionText: 'Nuestra Visión es lograr el reconocimiento como referentes principales en Medicina General dentro del área metropolitana, distinguiéndonos por nuestra excelencia en atención primaria y preventiva, y por nuestra capacidad de coordinar eficientemente la red de especialistas médicos. Convertirnos en un modelo de integración tecnológica y humana en el sector salud, garantizando un entorno accesible y de alta calidad para todos nuestros pacientes.',
      };
    },
    methods: {
        showMission() {
            this.isMissionActive = true;
        },
        showVision() {
            this.isMissionActive = false;
        },
    },
};
</script>

<style scoped>
.mision-container {
    display: flex;
    flex-direction: column;
    align-items: center; /* Centrar horizontalmente */
    text-align: center; /* Centrar texto */
    margin: 20px; /* Espaciado alrededor */
}

.header {
    display: flex;
    width: 70%; /* Cambiado a 70% del ancho */
    background-color: #f0f0f0; /* Color de fondo de la cabecera */
}

.title {
    flex: 1; /* Para que ocupen el mismo espacio */
    padding: 20px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s; /* Para transiciones suaves */
}

.title.active {
    background-color: #007bff; /* Azul para el activo */
    color: white; /* Color de texto blanco para el activo */
}

.content {
    margin-top: 20px;
    font-size: 1.2rem; /* Tamaño de fuente */
    width: 70%; /* Opcional: puedes añadir este estilo para que el contenido también ocupe 70% */
}
</style>
