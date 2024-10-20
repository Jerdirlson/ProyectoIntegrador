import { ref, computed } from 'vue'
import { LoginService, getUserService } from "@/service/LoginService";
import type { ILoginService, userType } from "@/types/loginType";
import { jwtDecode } from "jwt-decode";

export function useAuth() {
    const user = ref<userType | null>(null);
    const isAuthenticated = computed(() => !!user.value);
    const error = ref(null);

    const setUser = (newUser: userType) => {
        user.value = newUser;
    };

    const isTokenExpired = (token: string): boolean => {
        try {
            const decoded: any = jwtDecode(token);
            return decoded.exp < Date.now() / 1000;
        } catch (err) {
            console.error('Error decoding token:', err);
            return true;
        }
    };

    const login = async (credentials: ILoginService) => {
        try {
            const response = await LoginService(credentials);
            if (response.status === 401) return response;
            if (!response.data || !response.data.aws) throw new Error('Invalid login response');

            const token = response.data.aws;
            localStorage.setItem('token', token);

            return await fetchUser(token);
        } catch (err) {
            error.value = err?.response?.data?.message || 'Authentication error';
            throw err;
        }
    };

    const fetchUser = async (token: string) => {
        try {
            const response = await getUserService(token);
            if (!response.data) throw new Error('Invalid user data');
            user.value = response.data;
            return response.data;
        } catch (err) {
            console.error('Error fetching user:', err);
            error.value = err?.response?.data?.message || 'Error fetching user data';
            throw err;
        }
    };

    const logout = () => {
        user.value = null;
        localStorage.removeItem('token');
    };

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token && !isTokenExpired(token)) {
            await fetchUser(token);
        } else {
            logout();
        }
    };

    // Call checkAuth when the app initializes
    checkAuth();

    return {
        user,
        isAuthenticated,
        login,
        logout,
        isTokenExpired,
        error,
        checkAuth,
        setUser
    };
}
