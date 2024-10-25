import {useToast} from "@/composables/UseToast";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;


export const mailer = async (title: string, email: string, description: string) => {
    try {
        console.log('Enviando email', email);
        const response = await axios.post(apiUrl + 'send-email', {
            title,
            email,
            message: description
        });
        useToast({
            title: 'Cita agendada',
            description: 'La cita ha sido agendada exitosamente. Se ha enviado un correo de confirmación al paciente.',
            type: 'success',
            timeoutId: 7000
        });
        return response;
    } catch (error) {
        console.error(error);
        useToast({
            title: 'Error al enviar email',
            description: 'Error al enviar el email, por favor intenta nuevo',
            type: 'error',
            timeoutId: 5000
        })
    }
}
