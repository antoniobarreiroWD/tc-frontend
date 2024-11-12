import axios from 'axios';
import Cookies from 'js-cookie'

class AxiosConfig {
    constructor(path) {
        
        const baseUrl = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '');
        
       
        const cleanPath = (path || '').replace(/^\/+/, '');
        
        this.axios = axios.create({
            
            baseURL: `${baseUrl}/${cleanPath}`.replace(/\/+/g, '/')
        });

        
        this.axios.interceptors.request.use((config) => {
            const token = this.getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    getToken() {
        return Cookies.get("token")
    }
}

export default AxiosConfig;