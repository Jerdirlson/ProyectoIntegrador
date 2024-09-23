import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

interface ILoginService {
    user: string;
    pwd: string;
}

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
