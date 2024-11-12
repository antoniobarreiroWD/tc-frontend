import axios from 'axios';
import Cookies from 'js-cookie'

class AxiosConfig {
    constructor(path) {
        
        const baseUrl = process.env.NEXT_PUBLIC_API_URL 
            ? process.env.NEXT_PUBLIC_API_URL.trim()
            : '';

        
        const cleanPath = path ? path.replace(/^\/+|\/+$/g, '') : '';

        
        const finalUrl = baseUrl 
            ? `${baseUrl}${cleanPath ? '/api/' + cleanPath : ''}`
            : '';

      

        this.axios = axios.create({
            baseURL: finalUrl,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        
        this.axios.interceptors.request.use(config => {
           
            return config;
        });
    }

    getToken() {
        return Cookies.get("token")
    }
}

export default AxiosConfig;