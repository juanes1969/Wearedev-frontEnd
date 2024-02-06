import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';


const { VITE_API_URL } = getEnvVariables();

const configApi = axios.create({
    baseURL: VITE_API_URL
});

// TODO: configurar interceptores

configApi.interceptors.request.use(config => {

    config.headers = {

        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})


export default configApi;