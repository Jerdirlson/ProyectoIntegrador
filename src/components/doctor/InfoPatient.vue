<template>
  <div class="patient-info-container">
    <h3 class="title">Consultar información de paciente</h3>
    <div class="search-bar">
      <label for="documento">Documento del paciente</label>
      <input type="text" id="documento" v-model="document" placeholder="Ingrese el documento" />
      <button class="search-button" @click="buscarPaciente">Buscar</button>
    </div>
    <div class="patient-details" v-if="patient">
      <div class="patient-data">
        <h4>{{ patient.nombreUsuario }}</h4>
        <p><strong>Paciente:</strong> {{ patient.nombreUsuario }} {{ patient.apellidoUsuario }}</p>
        <p><strong>Correo Electrónico:</strong> {{ patient.emailUsuario }}</p>
        <p><strong>CC:</strong> {{ patient.CC }}</p>
      </div>
      <div class="patient-actions">
        <div class="action">
          <p>Historia Médica</p>
          <button @click="consultarHistoriaMedica">Consultar</button>
        </div>
        <div class="action">
          <p>Orden Médica</p>
          <button @click="consultarOrdenMedica">Consultar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getUsuarioPorCC, getHistoriaClinicaPorCC, getOrdenMedicaPorCC } from '@/service/DoctorService';

export default {
  setup() {
    const router = useRouter();
    const document = ref(''); 
    const patient = ref(null);
    const historiaClinica = ref(null);
    const ordenMedica = ref(null);

    const buscarPaciente = async () => {
      try {
        const usuario = await getUsuarioPorCC(document.value);
        
        if (usuario) {
          patient.value = usuario;
          const [historia, orden] = await Promise.all([
            getHistoriaClinicaPorCC(document.value),
            getOrdenMedicaPorCC(document.value)
          ]);
          historiaClinica.value = historia ? historia : null;
          ordenMedica.value = orden ? orden : null;
          if (!historia) {
            alert('No se encontró la historia clínica para este paciente');
          }
          
          if (!orden) {
            alert('No se encontró la orden médica para este paciente');
          }
          
        } else {
          alert('Paciente no encontrado');
          patient.value = null;
          historiaClinica.value = null;
          ordenMedica.value = null;
        }
      } catch (error) {
        console.error('Error al buscar el paciente, la historia clínica o la orden médica:', error);
        alert('Error al buscar el paciente. Revisa la consola para más detalles.');
      }
    };

    const consultarHistoriaMedica = () => {
      if (historiaClinica.value) {
        router.push({ 
          path: '/doc/historialclinicoinfo', 
          query: { cc: document.value }
        });
      } else {
        alert('No hay historia médica disponible para este paciente');
      }
    };

    const consultarOrdenMedica = () => {
      if (historiaClinica.value) {
        router.push({ 
          path: '/doc/ordenmedicainfo', 
          query: { cc: document.value }
        });
      } else {
        alert('No hay historia médica disponible para este paciente');
      }
    };

    return {
      document, 
      patient,
      historiaClinica,
      ordenMedica,
      buscarPaciente,
      consultarHistoriaMedica,
      consultarOrdenMedica
    };
  },
};
</script>

<style scoped>
.patient-info-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 25px;
  font-weight: bold;
  font-size: 1.75rem;
  color: #007bff;
}

.search-bar {
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
}

.search-bar label {
  font-size: 1rem;
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
}

.search-bar input {
  padding: 12px;
  border: 2px solid #007bff;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f7f9fc;
  margin-bottom: 15px;
}

.search-bar input:focus {
  border-color: #0056b3;
  outline: none;
}

.search-button {
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: #0056b3;
}

.patient-details {
  display: flex;
  justify-content: space-between;
  background-color: #f0f4f8;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.patient-data {
  flex: 1;
  padding-right: 20px;
}

.patient-data h4 {
  margin-bottom: 12px;
  font-size: 1.25rem;
  color: #333;
}

.patient-data p {
  margin: 6px 0;
  font-size: 1rem;
  color: #555;
}

.patient-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.action {
  margin-bottom: 12px;
}

.action p {
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.action button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action button:hover {
  background-color: #0056b3;
}

.action button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
