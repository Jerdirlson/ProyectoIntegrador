<script setup lang="ts">
import { ref, computed } from 'vue';
import { crearHojaVida, crearUsuario } from '../../service/Adminservice';
// Options for selectors
const tiposPaciente = [
  { value: 1, label: 'Sisben' },
  { value: 2, label: 'Afiliado' },
  { value: 3, label: 'Particular' }
];

const roles = [
  { value: 1, label: 'ADMIN - Administrador del sistema' },
  { value: 2, label: 'OPERADOR - Encargado de gestionar citas' },
  { value: 3, label: 'MEDICO - Profesional de la salud' },
  { value: 4, label: 'PACIENTE - Usuario del sistema' }
];

const especialidades = [
  { value: 1, label: 'Medicina General' },
  { value: 2, label: 'Emergencias' },
  { value: 3, label: 'Laboratorios' },
  { value: 4, label: 'Imágenes Diagnósticas' },
  { value: 5, label: 'Evaluaciones y Diagnósticos' },
  { value: 6, label: 'Tratamientos de rehabilitación' },
  { value: 7, label: 'Servicios quiroprácticos' },
  { value: 8, label: 'Ortopedia' },
  { value: 9, label: 'Tratamientos quirúrgicos' },
  { value: 10, label: 'Emergencias (2)' },
  { value: 11, label: 'Psicoterapia' },
  { value: 12, label: 'Consultas y diagnósticos' },
  { value: 13, label: 'Tratamientos' },
  { value: 14, label: 'Emergencias (3)' },
  { value: 15, label: 'Ginecología' },
  { value: 16, label: 'Medicina reproductiva' },
  { value: 17, label: 'Urología' },
  { value: 18, label: 'Salud sexual' },
  { value: 19, label: 'Educación y Promoción de la Salud Reproductiva' },
  { value: 20, label: 'Medicina Materno-Fetal' },
  { value: 21, label: 'Obstetricia' },
  { value: 22, label: 'Emergencias (4)' },
  { value: 23, label: 'Cardiología' },
  { value: 24, label: 'Neurología' },
  { value: 25, label: 'Gastroenterología' },
  { value: 26, label: 'Endocrinología' },
  { value: 27, label: 'Nefrología' },
  { value: 28, label: 'Hematología' },
  { value: 29, label: 'Oncología' },
  { value: 30, label: 'Reumatología' },
  { value: 31, label: 'Infectología' },
  { value: 32, label: 'Hepatología' },
  { value: 33, label: 'Emergencias (5)' },
  { value: 34, label: 'Cardiología (2)' },
  { value: 35, label: 'Neurología (2)' },
  { value: 36, label: 'Gastroenterología (2)' },
  { value: 37, label: 'Neumología' },
  { value: 38, label: 'Nefrología (2)' },
  { value: 39, label: 'Oftalmología' },
  { value: 40, label: 'Hematología (2)' },
  { value: 41, label: 'Alergología e inmunología' },
  { value: 42, label: 'Odontología' },
  { value: 43, label: 'Neonatología' },
  { value: 44, label: 'Emergencias (6)' },
  { value: 45, label: 'Cardiología (3)' },
  { value: 46, label: 'Neurología (3)' }
];


const eps = [
  { value: 1, label: 'Sanitas' },
  { value: 2, label: 'Salud Total' },
  { value: 3, label: 'Nueva Eps' },
  { value: 4, label: 'Sura' }
];

const sedes = ref([
  { value: 1, label: 'VitaMed MEDICINA GENERAL' },
  { value: 2, label: 'Sanavit MEDICINA MUSCULOESQUELÉTICA Y REHABILITACIÓN' },
  { value: 3, label: 'Aurea SALUD MENTAL' },
  { value: 4, label: 'ProSalud SALUD REPRODUCTIVA Y UROGENITAL' },
  { value: 5, label: 'Intervital MEDICINA INTERNA' },
  { value: 6, label: 'Growing Smiles PEDIATRÍA' }
]);

// Reactive data for USUARIOS and HOJAS_VIDA fields
const usuarioFields = ref({
  CC: '',
  nombreUsuario: '',
  apellidoUsuario: '',
  emailUsuario: '',
  pwdUsuario: '',
  idSede: null,
  idRol: null,
  estadoUsuario: 1,
  idEspecialidad: null,
  idHoja_Vida: null,
  idTipoPaciente: null
});

const hojaVidaFields = ref({
  direccion: '',
  estadoUsuario: 1,
  telefonoUsuario: '',
  idEps: null,
  tipo_documento: '',
  sexo: '',
  nacionalidad: '',
  pais: '',
  fecha_nacimiento: '',
  lugar_nacimiento: '',
  alergias: '',
  discapacidad: '',
  contacto_emergencia_nombre: '',
  contacto_emergencia_parentesco: '',
  contacto_emergencia_telefono: '',
  contacto_emergencia_correo: '',
  cargo: '',
  fechaIngreso: '',
  tipoContrato: '',
  salarioBasico: null,
  bonificaciones: null,
  deducciones: null,
  salarioNeto: computed(() => {
    const basico = Number(hojaVidaFields.value.salarioBasico) || 0;
    const bonif = Number(hojaVidaFields.value.bonificaciones) || 0;
    const deduc = Number(hojaVidaFields.value.deducciones) || 0;
    return basico + bonif - deduc;
  }),
  fechaPago: '',
  metodoPago: '',
  vacacionesPendientes: null,
  diasIncapacidad: null,
  historialPagos: '',
  autorizacionesEspeciales: '',
  fechaTerminacion: null,
  motivoTerminacion: '',
  observaciones: ''
});

const handleContinue = async () => {
  try {
    // Crear el JSON de Hoja de Vida con los datos del usuario
    const hojaVidaJSON = { ...hojaVidaFields.value };

    // Enviar el JSON de Hoja de Vida usando el servicio
    const hojaVidaData = await crearHojaVida(hojaVidaJSON);

    if (hojaVidaData) {
      const hojaVidaId = hojaVidaData.id;

      const usuarioJSON = {
        ...usuarioFields.value,
        idHoja_Vida: hojaVidaId
      };

      // Enviar el JSON de Usuario usando el servicio
      const usuarioData = await crearUsuario(usuarioJSON);

      if (usuarioData) {
        console.log('Usuario creado:', usuarioData);
        alert('Usuario y Hoja de Vida creados exitosamente');
        // Aquí puedes añadir lógica para reiniciar el formulario o redirigir al usuario
      } else {
        console.error('Error al crear el usuario.');
        alert('Error al crear el usuario');
      }
    } else {
      console.error('Error al crear la hoja de vida.');
      alert('Error al crear la Hoja de Vida');
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    alert('Error en la solicitud');
  }
};

</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex-1 overflow-hidden">
      <div class="flex-1 p-10 overflow-y-auto bg-gray-100 max-h-screen">
        <div class="bg-white shadow-md rounded-lg p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-3xl font-semibold">Registro de Usuario</h2>
          </div>

          <div class="mb-10">
            <h3 class="text-xl font-semibold mb-4">Información del Usuario</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="(value, key) in usuarioFields" :key="key">
                <label class="block text-gray-700 mb-2">{{ key }}</label>
                <input v-if="!['idSede', 'idRol', 'idEspecialidad', 'idTipoPaciente', 'estadoUsuario', 'idHoja_Vida'].includes(key)"
                  :type="key === 'pwdUsuario' ? 'password' : 'text'"
                  v-model="usuarioFields[key]"
                  class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select v-else-if="key === 'idSede'"
                  v-model="usuarioFields[key]"
                  class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option v-for="sede in sedes" :key="sede.value" :value="sede.value">
                    {{ sede.label }}
                  </option>
                </select>
                <select v-else-if="key === 'idRol'"
                  v-model="usuarioFields[key]"
                  class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option v-for="rol in roles" :key="rol.value" :value="rol.value">
                    {{ rol.label }}
                  </option>
                </select>
                <select v-else-if="key === 'idEspecialidad'"
                  v-model="usuarioFields[key]"
                  class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option v-for="especialidad in especialidades" :key="especialidad.value" :value="especialidad.value">
                    {{ especialidad.label }}
                  </option>
                </select>
                <select v-else-if="key === 'idTipoPaciente'"
                  v-model="usuarioFields[key]"
                  class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option v-for="tipo in tiposPaciente" :key="tipo.value" :value="tipo.value">
                    {{ tipo.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="mb-10">
            <h3 class="text-xl font-semibold mb-4">Hoja de Vida</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="(value, key) in hojaVidaFields" :key="key">
                <label class="block text-gray-700 mb-2">{{ key }}</label>
                <input v-if="['direccion', 'telefonoUsuario', 'nacionalidad', 'pais', 'lugar_nacimiento', 'alergias', 'discapacidad', 'contacto_emergencia_nombre', 'contacto_emergencia_parentesco', 'contacto_emergencia_telefono', 'contacto_emergencia_correo', 'cargo', 'metodoPago'].includes(key)"
                  type="text"
                  v-model="hojaVidaFields[key]"
                  class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input v-else-if="['fecha_nacimiento', 'fechaIngreso', 'fechaPago', 'fechaTerminacion'].includes(key)"
                  type="date"
                  v-model="hojaVidaFields[key]"
                  class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input v-else-if="['salarioBasico', 'bonificaciones', 'deducciones', 'vacacionesPendientes', 'diasIncapacidad'].includes(key)"
                  type="number"
                  v-model="hojaVidaFields[key]"
                  class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select v-else-if="key === 'idEps'"
                  v-model="hojaVidaFields[key]"
                  class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option v-for="option in eps" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
                <select v-else-if="key === 'tipo_documento'"
                  v-model="hojaVidaFields[key]"
                  class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="CC">CC</option>
                  <option value="TI">TI</option>
                  <option value="RC">RC</option>
                  <option value="CE">CE</option>
                </select>
                <select v-else-if="key === 'sexo'"
                  v-model="hojaVidaFields[key]"
                  class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="M">M</option>
                  <option value="F">F</option>
                </select>
                <select v-else-if="key === 'tipoContrato'"
                  v-model="hojaVidaFields[key]"
                  class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Indefinido">Indefinido</option>
                  <option value="Fijo">Fijo</option>
                  <option value="Prestación de servicios">Prestación de servicios</option>
                </select>
                <textarea v-else-if="['historialPagos', 'autorizacionesEspeciales', 'motivoTerminacion', 'observaciones'].includes(key)"
                  v-model="hojaVidaFields[key]"
                  class="w-full p-2 border border-gray-300 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                ></textarea>
                <input v-else-if="key === 'salarioNeto'"
                  type="number"
                  :value="hojaVidaFields.salarioNeto"
                  disabled
                  class="w-full p-2 border border-gray-300 rounded bg-gray-100"
                />
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <button 
              @click="handleContinue"
              class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all duration-300"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles here */
</style>