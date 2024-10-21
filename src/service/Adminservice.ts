import axios from 'axios';

const apiUrlHojaVida = 'http://localhost:3002/api/hoja-vida/'; 
const apiUrlEmergencias = 'http://localhost:3002/api/emergenciasdetalles';
const apiUrlFacturas = 'http://localhost:3002/api/facturas/';
const apiUrlColillas = 'http://localhost:3002/api/colillas/'; 
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

// Función para obtener doctor por cédula
export const obtenerDoctorPorCedula = async (cedula: string) => {
  try {
    const response = await axios.get(`${apiUrlDoctor}${cedula}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener información del doctor:', error);
    throw error;
  }
};

// Función para obtener hoja de vida por cédula o ID
export const obtenerHojaVida = async (cedula: string, buscarPorId = false) => {
  try {
    const url = buscarPorId ? `${apiUrlHojaVida}id/${cedula}` : `${apiUrlHojaVida}cc/${cedula}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error al obtener hoja de vida:', error);
    throw error;
  }
};

// Función para actualizar hoja de vida
export const actualizarHojaVida = async (idHojaVida: string, data: object) => {
  try {
    const response = await axios.put(`${apiUrlHojaVida}id/${idHojaVida}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar hoja de vida:', error);
    throw error;
  }
};

// Función para generar PDF de la hoja de vida
export const generarPDFHojaVida = async (idHojaVida: string) => {
  try {
    const response = await axios.get(`${apiUrlHojaVida}id/${idHojaVida}/pdf`, {
      responseType: 'blob'
    });
    
    // Crear un enlace de descarga para el PDF
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `hoja-vida-${idHojaVida}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error al generar el PDF de la hoja de vida:', error);
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

// Función para cancelar cita por ID
export const cancelarCitaPorId = async (idCita: string) => {
  try {
    const response = await axios.delete(cancelarCitaUrl(idCita), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(`Error ${error.response.status}: ${error.response.data.message}`);
    } else {
      throw new Error(`Error al cancelar la cita: ${error.message}`);
    }
  }
};