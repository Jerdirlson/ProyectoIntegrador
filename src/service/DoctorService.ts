import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

// Obtener los pacientes asignados a un doctor por su ID
export const getPacientesAsignadosAlDoctor = async (idDoctor: string) => {
  return axios.get(`${apiUrl}doctor/pacientes/${idDoctor}`)
    .then(response => {
      return response.data; // Devolver los datos directamente
    })
    .catch(error => {
      console.log('Error al obtener los pacientes:', error);
      throw error;
    });
};

export const getUsuarioPorCC = async (CC: string) => {
    return axios.get(`${apiUrl}usuarios/getByCCUsers/${CC}`)
      .then(response => {
        return response.data; // Devolver los datos del usuario
      })
      .catch(error => {
        console.error('Error al obtener el usuario:', error);
        throw error;
      });
  };

export const getEmergenciasPrioridad = async () => {
  return axios.get(`${apiUrl}emergencias/emergencias-prioridad`)
    .then(response => {
      return response.data; // Devolver los datos directamente
    })
    .catch(error => {
      console.error('Error al obtener las emergencias citas:', error);
      throw error;
    });
};


// Obtener la historia clínica de un paciente por su CC
export const getHistoriaClinicaPorCC = async (idUsuarioCC: string) => {
  try {
    const response = await axios.get(`${apiUrl}historia-clinica/getHistorias-clinicas/usuario/${idUsuarioCC}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la historia clínica:', error);
    throw error;
  }
};