import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const enqueueDoctor = async (idDoc: string) => {
  try {
    const response = await axios.get(`${apiUrl}doctor/encolar/${idDoc}`);
    return response.data;
  } catch (error) {
    console.error('Error al encolar al doctor:', error);
    throw error;
  }
};

export const popDoctor = async (idDoc: string) => {
  try {
    const response = await axios.get(`${apiUrl}doctor/pop/${idDoc}`);
    return response.data;
  } catch (error) {
    console.error('Error al desencolar al doctor:', error);
    throw error;
  }
};

export const createOrdenMedica = async (ordenMedica: { idCita: number; estadoOM: number; diagnostico: string; ordenes: string; recomendaciones: string }) => {
  try {
    const response = await axios.post(`${apiUrl}ordenes-medicas/create`, ordenMedica, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear la orden médica:', error);
    throw error;
  }
};

export const getHistoriaClinicaPorCCc = async (idUsuarioCC: string) => {
  try {
    const response = await axios.get(`${apiUrl}historia-clinica/getHistorias-clinicas/usuarios/${idUsuarioCC}`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener la historia clínica:', error);
    throw error;
  }
};

export const getOrdenMedicaPorCCc = async (CC: string) => {
  try {
    const response = await axios.get(`${apiUrl}ordenes-medicas/orden-medicas/cc/${CC}`, {
      responseType: 'blob', 
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener la orden médica por CC:', error);
    throw error;
  }
};

// Función para actualizar la orden médica
export const updateOrdenMedica = async (id: string, data: any) => {
  try {
    const response = await axios.put(`${apiUrl}ordenes-medicas/update/${id}`, data);
    return response.data; // Devolver los datos de la orden médica actualizada
  } catch (error) {
    console.error('Error al actualizar la orden médica:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

export const getOrdenMedicaPorCC = async (CC: string) => {
  try {
    const response = await axios.get(`${apiUrl}ordenes-medicas/orden-medica/cc/${CC}`);
    return response.data; // Devolver los datos de la orden médica
  } catch (error) {
    console.error('Error al obtener la orden médica por CC:', error);
    throw error;
  }
};

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

export const updateHistoriaClinica = async (idHistoria: number, data: any) => {
  try {
    const response = await axios.put(`${apiUrl}historia-clinica/updateHistorias-clinicas/${idHistoria}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la historia clínica:', error);
    throw new Error('Error al actualizar la historia clínica');
  }
};

// Nuevo servicio para crear la historia clínica
export const createHistoriaClinica = async (historiaClinica: any) => {
  try {
    const response = await axios.post(`${apiUrl}historia-clinica/createHistorias-clinicas`, historiaClinica);
    return response.data; // Retorna la respuesta del backend
  } catch (error) {
    console.error('Error al crear la historia clínica:', error);
    throw error;
  }
};
