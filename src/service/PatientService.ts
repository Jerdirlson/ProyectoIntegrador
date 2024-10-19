import axios from 'axios';

const apiUrlCitas = 'http://localhost:3002/api/citas/getCitaId/'; // Ruta base para obtener citas por ID

export const obtenerCitasPorId = async (idCita: string) => {
  try {
    const response = await axios.get(`${apiUrlCitas}${idCita}`); // Llama a la API con el ID
    return response.data;
  } catch (error) {
    console.error('Error al obtener citas:', error);
    throw new Error('Error al obtener citas'); // Propaga el error para manejarlo en el frontend
  }
};

// services/patientService.ts
const apiUrlCancelarCita = 'http://localhost:3002/api/citas/deleteCitaId/';

export const cancelarCita = async (idCita: string) => {
  try {
    const response = await axios.delete(`${apiUrlCancelarCita}${idCita}`);
    return response.data;
  } catch (error) {
    console.error('Error al cancelar la cita:', error);
  }
};


const citas: { value: any[] } = { value: [] };

const buscarCitas = async (idCita: string) => {
  try {
    const response = await axios.get(`http://localhost:3002/api/citas/getCitaId/`);
    console.log(response.data);  // Verifica aquí cómo se ven los datos
    citas.value = [response.data];
  } catch (error) {
    console.error('Error al buscar citas:', error);
    citas.value = [];
  }
};
