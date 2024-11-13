import axios from 'axios';
import Cookies from 'js-cookie';

class AxiosConfig {
    constructor(path) {
       
        const baseUrl = process.env.NEXT_PUBLIC_API_URL 
            ? process.env.NEXT_PUBLIC_API_URL.trim()
            : 'http://localhost:3001'; 

        
        const cleanPath = path ? path.replace(/^\/+|\/+$/g, '') : '';

        
        const finalUrl = `${baseUrl}${cleanPath ? '/api/' + cleanPath : ''}`;

        
        this.axios = axios.create({
            baseURL: finalUrl,
            headers: {
                'Content-Type': 'application/json',
            }
        });

     
        this.axios.interceptors.request.use(config => {
            const token = this.getToken();
            if (token) {
               
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

   
    getToken() {
        return Cookies.get("token");
    }
}

export default AxiosConfig;
