import axios from 'axios';
import type { ILoginService } from "@/types/loginType";
const apiUrl = import.meta.env.VITE_API_URL;

export const LoginService = (data: ILoginService) => {
    return axios.post(apiUrl + 'auth/login', data)
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log('error ', error);
            return error;
        });
}

export const getUserService = async (token : string) => {
    return axios.get(apiUrl + 'auth/validate', {
        headers: {
            'auth-token': `${token}`
        }
    })
      .then(response => {
        return response;
      })
      .catch(error => {
          return error;
      })
};
