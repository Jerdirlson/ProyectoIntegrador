import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { LoginService } from "@/service/LoginService";
import type { ILoginService } from "@/types/loginType";


export function useAuth() {
    const user = useStorage('user', null)
    const isAuthenticated = computed(() => !!user.value)
    const error = ref(null)

    const login = async (credentials: ILoginService) => {
        try {
            const response = await LoginService(credentials)
            if (response.data) {
                user.value = response.data;
                error.value = null;
            } else {
                throw new Error('Respuesta de login inválida');
            }
            return response;
        } catch (err) {
            console.error('Error de login:', err);
            error.value = err.response?.data?.message || 'Error de autenticación';
            throw err;
        }
    }

    const logout = () => {
        user.value = null
        // Aquí puedes agregar lógica adicional, como invalidar el token en el servidor
    }

    const updateUser = (newData) => {
        if (user.value) {
            user.value = { ...user.value, ...newData }
        }
    }

    return {
        user,
        isAuthenticated,
        login,
        logout,
        updateUser,
        error
    }
}
