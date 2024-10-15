<script>

import { ref, onMounted, onUnmounted } from 'vue';
import * as MercadoPagoServices from '../../service/MercadoPagoService';

export default {
  setup() {
    // Define reactive variables for managing component state
    const searchById = ref(false); // Flag to toggle between ID and CC search modes
    const searchQuery = ref(''); // Holds the user input for search
    const paymentSlips = ref([]); // Array to store the fetched payment slips
    const loading = ref(false); // Indicates if the application is currently loading data
    const error = ref(null); // Stores error messages to display to the user
    const isFreezed = ref(false); // Freezes the interface during payment processing
    const showSuccessMessage = ref(false); // Controls visibility of success message after payment
    const successMessage = ref(''); // Stores the success message text
    const currentPaymentId = ref(null); // Holds the ID of the current payment being processed

    // Function to search for a payment slip based on the search mode (ID or CC)
    const searchPaymentSlip = async () => {
      // Validate input and display an error if empty
      if (!searchQuery.value) {
        error.value = 'Por favor, ingrese un valor para buscar.';
        return;
      }

      loading.value = true; // Start loading state
      error.value = null; // Reset error state
      paymentSlips.value = []; // Clear previous results

      try {
        let response;

        // Fetch data using the appropriate service based on search mode
        if (searchById.value) {
          response = await MercadoPagoServices.getPaymentSlipById(searchQuery.value);
        } else {
          response = await MercadoPagoServices.getPaymentSlipByCC(searchQuery.value);
        }

        // Handle the response format and populate paymentSlips array
        if (Array.isArray(response.data)) {
          paymentSlips.value = response.data.map(slip => ({ ...slip, loading: false }));
        } else if (typeof response.data === 'object' && response.data !== null) {
          paymentSlips.value = [{ ...response.data, loading: false }];
        } else {
          throw new Error('Unexpected response format');
        }

        // Show error message if no payment slips were found
        if (paymentSlips.value.length === 0) {
          error.value = 'No se encontraron colillas de pago';
        }
      } catch (err) {
        console.error('Error fetching payment slip:', err);
        error.value = 'Error al buscar la colilla de pago. Por favor, intente nuevamente.';
      } finally {
        loading.value = false; // End loading state
      }
    };

    // Helper function to format date strings to a readable format
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    // Function to initiate the payment process for a selected payment slip
    const initiatePayment = async (id) => {
      if (isFreezed.value) return; // Prevent initiating if already processing

      const slip = paymentSlips.value.find(s => s['ID Colilla'] === id);
      if (!slip) return;
      slip.loading = true; // Set loading state for the specific slip

      try {
        const response = await MercadoPagoServices.initiatePayment(id);

        // Check if the payment URL is available and open it
        if (response.data && response.data.url) {
          currentPaymentId.value = id;
          openPaymentUrl(response.data.url);
        } else {
          throw new Error('Payment URL not received');
        }
      } catch (err) {
        console.error('Error initiating payment:', err);
        error.value = 'Error al iniciar el pago. Por favor, intente nuevamente.';
      } finally {
        slip.loading = false; // End loading state for the specific slip
      }
    };

    // Opens the payment URL in a new window and monitors for window closure
    const openPaymentUrl = (url) => {
      isFreezed.value = true;
      const paymentWindow = window.open(url, '_blank');
      
      if (paymentWindow) {
        const checkWindowClosed = setInterval(() => {
          if (paymentWindow.closed) {
            clearInterval(checkWindowClosed);
            isFreezed.value = false;
            updatePaymentStatus(); // Update the status after payment window is closed
          }
        }, 500);
      } else {
        isFreezed.value = false;
        error.value = 'No se pudo abrir la ventana de pago. Por favor, permita las ventanas emergentes e intente nuevamente.';
      }
    };

    // Updates the payment status for the current payment and displays a success message
    const updatePaymentStatus = async () => {
      try {
        const response = await MercadoPagoServices.updatePaymentStatus(currentPaymentId.value);
        successMessage.value = response.data.message;
        showSuccessMessage.value = true; // Show success message after updating payment status
      } catch (err) {
        console.error('Error updating payment status:', err);
        error.value = 'Error al actualizar el estado de la colilla. Por favor, verifique el estado del pago.';
      }
    };

    // Function to close the success message pop-up
    const closeSuccessMessage = () => {
      showSuccessMessage.value = false;
      successMessage.value = '';
    };

    // Disables scroll when payment process is ongoing
    const disableScroll = (e) => {
      if (isFreezed.value) {
        e.preventDefault();
      }
    };

    // Sets up event listeners on component mount to prevent scrolling during payment process
    onMounted(() => {
      window.addEventListener('wheel', disableScroll, { passive: false });
      window.addEventListener('touchmove', disableScroll, { passive: false });
    });

    // Removes the event listeners when the component is unmounted
    onUnmounted(() => {
      window.removeEventListener('wheel', disableScroll);
      window.removeEventListener('touchmove', disableScroll);
    });

    // Return values and functions to make them available in the template
    return {
      searchById,
      searchQuery,
      paymentSlips,
      loading,
      error,
      isFreezed,
      showSuccessMessage,
      successMessage,
      searchPaymentSlip,
      formatDate,
      initiatePayment,
      closeSuccessMessage
    };
  }
};
</script>

<template>
  <div class="relative min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-16">
    <div :class="{ 'blur-sm': isFreezed }" class="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-16 transition-all duration-300">
        <h2 class="text-4xl font-bold text-blue-600 mb-8 text-center animate__animated animate__fadeInDown">
          Módulo Pasarela de Pago
        </h2>
        
        <!-- Logo de Mercado Pago -->
        <!-- Displaying Mercado Pago logo at the center -->
        <div class="mb-10 flex justify-center">
          <img src="https://belvo.com/wp-content/uploads/2023/07/mercado-pago-logo.png" alt="Logo de Mercado Pago" class="h-12 animate__animated animate__fadeIn" />
        </div>
  
        <!-- Selector de búsqueda -->
        <!-- Toggle switch for search mode (ID or Cedula) -->
        <div class="mb-10">
          <label class="flex items-center cursor-pointer">
            <div class="relative">
              <input type="checkbox" v-model="searchById" class="sr-only" />
              <div class="w-14 h-7 bg-gray-300 rounded-full shadow-inner"></div>
              <div class="dot absolute w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ease-in-out" 
                   :class="searchById ? 'transform translate-x-7 bg-blue-600' : ''"></div>
            </div>
            <div class="ml-3 text-gray-700 font-medium">
              {{ searchById ? 'Buscar por ID de Colilla' : 'Buscar por Cédula' }}
            </div>
          </label>
        </div>
  
        <!-- Campo de búsqueda -->
        <!-- Input field for search query, changes placeholder based on search mode -->
        <div class="mb-10">
          <input type="text" v-model="searchQuery" 
                 :placeholder="searchById ? 'Ingrese ID de Colilla' : 'Ingrese Cédula'"
                 class="w-full px-4 py-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out" />
        </div>
  
        <!-- Botón de búsqueda -->
        <!-- Button to trigger search functionality -->
        <button @click="searchPaymentSlip" 
                :disabled="loading || isFreezed"
                class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 mb-10 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
          {{ loading ? 'Buscando...' : 'Buscar Colilla de Pago' }}
        </button>
  
        <!-- Mensaje de error -->
        <!-- Displays an error message if there's an error during search -->
        <div v-if="error" class="mb-10 text-red-600 text-center">
          {{ error }}
        </div>
  
        <!-- Tabla de colillas -->
        <!-- Displays a table of payment slips if available -->
        <div v-if="paymentSlips.length > 0" class="overflow-hidden">
          <table class="min-w-full bg-white border border-gray-200">
            <thead>
              <tr class="bg-blue-200 text-gray-800">
                <th class="py-4 px-6 border-b">Nombre</th>
                <th class="py-4 px-6 border-b">CC</th>
                <th class="py-4 px-6 border-b">Fecha Colilla</th>
                <th class="py-4 px-6 border-b">ID Colilla</th>
                <th class="py-4 px-6 border-b">Nombre del Servicio</th>
                <th class="py-4 px-6 border-b">Valor</th>
                <th class="py-4 px-6 border-b w-48">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <!-- Loop through each payment slip and display its details -->
              <tr v-for="slip in paymentSlips" :key="slip['ID Colilla']" class="text-gray-700 hover:bg-gray-100">
                <td class="py-4 px-6 border-b">{{ slip.Nombre }}</td>
                <td class="py-4 px-6 border-b">{{ slip.CC }}</td>
                <td class="py-4 px-6 border-b">{{ formatDate(slip['Fecha Colilla']) }}</td>
                <td class="py-4 px-6 border-b">{{ slip['ID Colilla'] }}</td>
                <td class="py-4 px-6 border-b">{{ slip['Nombre del Servicio'] }}</td>
                <td class="py-4 px-6 border-b">{{ slip.Valor }}</td>
                <td class="py-4 px-6 border-b text-center">
                  <!-- Button to initiate payment for each slip -->
                  <button @click="initiatePayment(slip['ID Colilla'])" 
                          :disabled="slip.loading || isFreezed"
                          class="flex items-center justify-center bg-blue-500 text-white py-3 px-8 rounded-md hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                    <img v-if="!slip.loading" src="https://belvo.com/wp-content/uploads/2023/07/mercado-pago-logo.png" alt="Logo de Mercado Pago" class="h-5 mr-2" />
                    <span v-if="slip.loading" class="mr-2">
                      <!-- Here you can add a loading icon if desired -->
                    </span>
                    {{ slip.loading ? 'Procesando...' : 'Pagar' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Mensaje sobre la integridad de los datos -->
      <!-- Message about data integrity and security measures of Mercado Pago -->
      <div :class="{ 'blur-sm': isFreezed }" class="mt-12 max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6 text-center transition-all duration-300">
        <h3 class="text-xl font-semibold text-gray-800 mb-3">Sobre la Integridad de los Datos</h3>
        <p class="text-gray-600">
          Mercado Pago, fundado en 2003, es una de las principales plataformas de pago en línea en América Latina. 
          Ofrece soluciones seguras y confiables para la gestión de pagos, garantizando la integridad de los datos de sus usuarios. 
          Con tecnología de encriptación avanzada y un enfoque en la seguridad, Mercado Pago protege tus datos personales y financieros 
          en cada transacción, brindándote la tranquilidad que necesitas para realizar tus pagos de forma segura.
        </p>
      </div>
  
      <!-- Overlay de espera -->
      <!-- Overlay that appears while waiting for payment processing -->
      <div v-if="isFreezed" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-lg shadow-xl text-center">
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Esperando a que se realice el pago</h2>
          <p class="text-gray-600">Por favor, complete el proceso de pago en la ventana de Mercado Pago.</p>
        </div>
      </div>
  
      <!-- Mensaje de éxito -->
      <!-- Message that appears after successful payment -->
      <div v-if="showSuccessMessage" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-lg shadow-xl text-center max-w-md">
          <div class="text-green-500 mb-4">
            <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-2">¡Pago Realizado con Éxito!</h2>
          <p class="text-gray-600 mb-4">{{ successMessage }}</p>
          <button @click="closeSuccessMessage" class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </template>
  

<style scoped>
.dot {
  top: 0.1rem;
  left: 0.1rem;
  transition: all 0.3s ease-in-out;
}

input:checked ~ .dot {
  transform: translateX(100%);
  background-color: #3b82f6;
}

.animate__animated {
  animation-duration: 0.5s;
  animation-fill-mode: both;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

table {
  width: 100%;
}

tbody tr {
  height: 60px;
}

.blur-sm {
  filter: blur(4px);
}
</style>
