import axios from 'axios';
import type { AxiosResponse } from 'axios';

// Base URL for the MercadoPago API endpoints
const API_BASE_URL = 'http://localhost:3002/api/MercadoPagoFront';

/**
 * Retrieves a payment slip by its ID.
 * @param id - The unique identifier for the payment slip.
 * @returns A promise that resolves to an Axios response containing the payment slip details.
 */
export const getPaymentSlipById = async (id: string | number): Promise<AxiosResponse> => {
  return await axios.get(`${API_BASE_URL}/colillas/id/${id}`);
};

/**
 * Retrieves a payment slip by the customer's ID card number (CC).
 * @param cc - The customer's ID card number (CC) for the payment slip.
 * @returns A promise that resolves to an Axios response containing the payment slip details.
 */
export const getPaymentSlipByCC = async (cc: string | number): Promise<AxiosResponse> => {
  return await axios.get(`${API_BASE_URL}/colillas/cc/${cc}`);
};

/**
 * Initiates a payment process for a given payment slip ID.
 * @param colillaId - The unique identifier for the payment slip to be paid.
 * @returns A promise that resolves to an Axios response confirming the payment initiation.
 */
export const initiatePayment = async (colillaId: string | number): Promise<AxiosResponse> => {
  return await axios.post('http://localhost:3002/api/mercadopago/pago', { colillaId });
};

/**
 * Updates the payment status of a payment slip by its ID.
 * @param colillaId - The unique identifier for the payment slip whose status is to be updated.
 * @returns A promise that resolves to an Axios response confirming the update of the payment status.
 */
export const updatePaymentStatus = async (colillaId: string | number): Promise<AxiosResponse> => {
  return await axios.put(`${API_BASE_URL}/colilla-Estado/${colillaId}`);
};
