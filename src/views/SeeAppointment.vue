<script setup lang="ts">
import {onMounted, ref, watchEffect} from 'vue';
import ViewTable from "@/components/DashboardUser/ViewTable.vue";
import axios from 'axios';
import {useAuth} from "@/composables/UseAuth";

export type citasType = {
  cc: string;
  paciente: string;
  hora: string;
  fecha: string;
  servicio: string;
  idCita: string;
  doc: string;
  estado: string;
  pago: string;
};

interface Service {
  id: string;
  nombre: string;
  precio: number;
}


// type responseCita = Omit<citasType, >

const citas = ref<any[]>([]);
const apiUrl = import.meta.env.VITE_API_URL;

const { user, checkAuth } = useAuth();

const buscarCitas = async (idCita: string): responseCita => {
  try {
    const response = await axios.get(apiUrl + `citas/getCitaUser/${idCita}`);
    return response.data;
    // citas.value = response.data;
  } catch (error) {
    console.error('Error al buscar citas:', error);
    citas.value = [
      {
        cc: 'N/A',
        paciente: 'N/A',
        hora: 'N/A',
        fecha: 'N/A',
        servicio: 'N/A',
        idCita: 'N/A',
        doc: 'N/A',
        estado: 'N/A',
        pago: 'N/A'
      }
    ];
  }
};

const getDoctor = async (idDoctor: string): string => {
  try {
    const response = await axios.get(apiUrl + `doctor/doctor/${idDoctor}`);
    return response.data;
  } catch (error) {
    console.error('Error al buscar doctor:', error);
    return 'N/A';
  }
};

const getService = async (idServicio: string): Promise<Service | null> => {
  try {
    const response = await fetch('/data/services.json');

    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }

    const services: Service[] = await response.json();

    const service = services.find((s) => s.id === idServicio);

    if (!service) {
      return null;
    }

    return service;
  } catch (error) {
    console.error('Error al buscar servicio:', error);
    return null;
  }
};

onMounted(async () => {
  await checkAuth();
  if (user.value) {
    const reponseCita = await buscarCitas(user.value.CC);
    for (const reponseCitaElement of reponseCita) {
      const doctor = await getDoctor(reponseCitaElement.idDocCC);
      const servicio = await getService(reponseCitaElement.idServicio);

      citas.value.push({
        cc: user.value.CC,
        paciente: reponseCitaElement.idPacienteCC,
        hora: reponseCitaElement.hora,
        fecha: reponseCitaElement.dia,
        servicio: servicio ? servicio.servicio : 'N/A',
        idCita: reponseCitaElement.idCita,
        doc: doctor[0].apellidoUsuario,
        estado: parserStatus(reponseCitaElement.estadoCita),
        pago: parserPago(reponseCitaElement.estadoCita, servicio),
      });

    }
  } else {
    console.log('Usuario no autenticado');
  }
});

const parserStatus = (status: number) => {
  switch (status) {
    case 0:
      return 'Activo';
    case 1:
      return 'Finalizado';
    default:
      return 'N/A';
  }
};

const parserPago = (pago: number, servicio : Service) => {
  switch (pago) {
    case 0:
      return servicio.precio;
    case 1:
      return 'SI';
    default:
      return 'N/A';
  }
};
</script>

<template>
  <div class="w-full h-[calc(100vh-9rem)]">
    <div class="w-full h-full p-16">
      <div class="flex flex-col h-full w-full">
        
        <!-- Título y descripción alineados a la izquierda -->
        <div class="text-left">
          <h1 class="text-3xl font-bold mb-4">Ver tu cita</h1>
          <p class="text-lg">
            Explora nuestros servicios diseñados para cuidar de ti y tu familia. Desde medicina general hasta emergencias y diagnósticos avanzados,
            estamos aquí para atenderte con la mejor calidad y profesionalismo.
          </p>
        </div>


        <!-- Tabla para mostrar citas obtenidas -->
        <div class="mt-8">
          <ViewTable :citas="citas" />
        </div>
      </div>
    </div>
  </div>
</template>
