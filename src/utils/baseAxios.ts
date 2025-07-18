import axios from 'axios';
import Cookies from 'js-cookie';

interface AxiosConfig {
    auth?: boolean;
}

const createAxios = ({ auth = false }: AxiosConfig = {}) => {
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:8000',
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
            ...(auth && {
                Authorization: `Bearer ${ Cookies.get('accessToken') }`,
            }),
        },
    });

    return instance;
};

export default createAxios;
