import axios from 'axios';

const apiUrlHojaVida = 'http://localhost:3002/api/hoja-vida/'; 
const apiUrlEmergencias = 'http://localhost:3002/api/emergenciasdetalles';
const apiUrlFacturas = 'http://localhost:3002/api/facturas/';
const apiUrlColillas = 'http://localhost:3002/api/colillas/'; 
const apiUrlColillasP = 'http://localhost:3002/api/colillaPago/'; 
const apiUrlOrdenesMedicas = 'http://localhost:3002/api/ordenes-medicas/'; 
const apiUrlCitas = 'http://localhost:3002/api/citas/completas/';
const apiUrlDoctor = 'http://localhost:3002/api/doctor/';

const CrearHojadevidaurl = 'http://localhost:3002/api/crearHojaVida';
const Crearusuariourl = 'http://localhost:3002/api/usuarios/crearusuario';
// URL para cancelar cita
const cancelarCitaUrl = (idCita: string) => `http://localhost:3002/api/citas/citas/${idCita}`;

const urlAuditorias = 'http://localhost:3002/api/admin/auditorias';
const apiUrlCheckBill = 'http://localhost:3002/api/facturacion/checkBill';
const apiUrlResumenFinanciero = 'http://localhost:3002/api/resumen-financiero';


const apiUrlResumenCRM = 'http://localhost:3002/api/resumen-crm';
const apiUrlCitasPorEspecialidad = 'http://localhost:3002/api/citas-por-especialidad';

export const obtenerColillaPDF = async (idColilla: string) => {
  try {
    const response = await axios.get(`${apiUrlColillasP}pdf/${idColilla}`, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener el PDF de la colilla:', error);
    throw error;
  }
};

export const obtenerResumenCRM = async () => {
  try {
    const response = await axios.get(apiUrlResumenCRM);
    return response.data;
  } catch (error) {
    console.error('Error al obtener resumen CRM:', error);
    throw error;
  }
};

export const obtenerCitasPorEspecialidad = async () => {
  try {
    const response = await axios.get(apiUrlCitasPorEspecialidad);
    return response.data;
  } catch (error) {
    console.error('Error al obtener citas por especialidad:', error);
    throw error;
  }
};

export const obtenerResumenFinanciero = async () => {
  try {
    const response = await axios.get(apiUrlResumenFinanciero);
    return response.data;
  } catch (error) {
    console.error('Error al obtener resumen financiero:', error);
    throw error;
  }
};


export const obtenerFacturaPDF = async (idCita: number) => {
  try {
    const response = await axios.post(apiUrlCheckBill, { idCita }, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener la factura PDF:', error);
    throw error;
  }
};

export const obtenerAuditorias = async (tipoAuditoria :string) => {
  try {
    const response = await axios.get(`${urlAuditorias}/${tipoAuditoria}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener auditorías:', error);
    throw error; 
  }
};

export const crearHojaVida = async (hojaVidaJSON: object) => {
  const response = await fetch(CrearHojadevidaurl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hojaVidaJSON),
  });
  return response.json(); // Retornar el JSON de la respuesta
};

// Función para crear Usuario
export const crearUsuario = async (usuarioJSON: object) => {
  const response = await fetch(Crearusuariourl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuarioJSON),
  });
  return response.json(); // Retornar el JSON de la respuesta
};




export const obtenerDoctorPorCedula = async (cedula: string) => {
  try {
    const response = await axios.get(`${apiUrlDoctor}${cedula}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener información del doctor:', error);
    throw error;
  }
};

// Función para obtener hoja de vida por cédula
export const obtenerHojaVida = async (cedula: string) => {
  try {
    const response = await axios.get(`${apiUrlHojaVida}${cedula}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener hoja de vida:', error);
    throw error;
  }
};
// Función para obtener citas por cédula
export const obtenerCitasCompletas = async (cedula: string) => {
    try {
      const response = await axios.get(`${apiUrlCitas}${cedula}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener citas:', error);
      throw error;
    }
  };
// Función para obtener órdenes médicas por cédula
export const obtenerOrdenesMedicas = async (cedula: string) => {
  try {
    const response = await axios.get(`${apiUrlOrdenesMedicas}${cedula}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener órdenes médicas:', error);
    throw error;
  }
};
// Función para obtener colillas por cédula
export const obtenerColillas = async (cedula: string) => {
  try {
    const response = await axios.get(`${apiUrlColillas}${cedula}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener colillas:', error);
    throw error;
  }
};

export const obtenerEmergenciasDetalles = async () => {
  try {
    const response = await axios.get(apiUrlEmergencias);
    return response.data;
  } catch (error) {
    console.error('Error al obtener emergencias detalles:', error);
    throw error;
  }
};

// Modificar obtenerFacturas para aceptar una cédula
export const obtenerFacturas = async (cedula: string) => {
  try {
    const response = await axios.get(`${apiUrlFacturas}${cedula}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener facturas:', error);
    throw error;
  }
};

export const cancelarCitaPorId = async (idCita: string) => {
  try {
    const response = await axios.delete(cancelarCitaUrl(idCita), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Si fue exitosa, retorna la respuesta
    return response.data;
  } catch (error) {
    // Maneja los errores, incluyendo el caso en que no hay respuesta del servidor
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      throw new Error(`Error ${error.response.status}: ${error.response.data.message}`);
    } else {
      // Error en la configuración de la solicitud o problema de red
      throw new Error(`Error al cancelar la cita: ${error.message}`);
    }
  }
};
