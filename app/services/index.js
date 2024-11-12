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

        console.log('Final URL:', finalUrl);

        this.axios = axios.create({
            baseURL: finalUrl,
            headers: {
                'Content-Type': 'application/json',
            }
        });

        
        this.axios.interceptors.request.use(config => {
            console.log('Request Config:', {
                method: config.method,
                url: config.url,
                baseURL: config.baseURL,
                fullURL: config.baseURL + (config.url || '')
            });
            return config;
        });
    }

    getToken() {
        return Cookies.get("token")
    }
}

export default AxiosConfig;