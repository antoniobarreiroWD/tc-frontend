const base = process.env.NEXT_PUBLIC_API_URL
import axios from 'axios';
import Cookies from 'js-cookie'

class AxiosConfig {
    constructor(path) {
        this.axios = axios.create(
            {
              baseURL: `${base}/${path}`
            }
        );
    }

    getToken() {
        return Cookies.get("token")
    }
}

export  default AxiosConfig;