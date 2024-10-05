import {ref, computed, type Ref} from 'vue'
import {getUserService, LoginService} from "@/service/LoginService";
import type {ILoginService, userType} from "@/types/loginType";
import {jwtDecode} from "jwt-decode";


export function useAuth() {
    const user: Ref< userType| null> = ref(null);
    const isAuthenticated = computed(() => !!user.value)
    const error = ref(null);

    const isTokenExpired = (token: string): boolean => {
        try {
            const decoded: any = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp < currentTime;
        } catch (err) {
            console.error('Error decoding token:', err);
            return true;
        }
    };

    const login = async (credentials: ILoginService) => {
        try {
            const response = await LoginService(credentials)
            if (!response.data) throw new Error('Respuesta de login inválida');
            return response;
        } catch (err) {
            console.error('Error de login:', err);
            error.value = err?.response?.data?.message || 'Error de autenticación';
            throw err;
        }
    }

    const getUser = async (token : string) : Promise<userType | null> => {
        try {
            if (user.value) return user.value;
            const response = await getUserService(token);
            if (response.data) {
                user.value = response.data;
            } else {
                throw new Error('Respuesta de login inválida');
            }
            return user.value;
        } catch (err) {
            console.error('Error de login:', err);
            error.value = err?.response?.data?.message || 'Error de autenticación';
            throw err;
        }
    }

    const logout = () => {
        user.value = null
    }

    // const updateUser = (newData) => {
    //     if (user.value) {
    //         user.value = { ...user.value, ...newData }
    //     }
    // }

    return {
        user,
        isAuthenticated,
        login,
        logout,
        isTokenExpired,
        // updateUser,
        getUser,
        error
    }
}
