import AxiosConfig from ".";

class RestaurantService extends AxiosConfig {
    constructor() {
        super('restaurants');
    }

    async getAllRestaurants() {
        const res = await this.axios.get("/list");
        if (res.status === 200) {
            return res.data;
        }
        throw new Error('Error al obtener los datos');
    }

    async getRestaurantById(restaurant_id) {
        const res = await this.axios.get(`/getOne/${restaurant_id}`);
        if (res.status === 200) {
            return res.data;
        }
        throw new Error('Failed to fetch data');
    }

    async createRestaurant(data) {
        try {
            const res = await this.axios.post("/create", data);
            return res.data;
        } catch (error) {
            console.error("Error en createRestaurant:", error);
            throw error;
        }
    }

    async editRestaurant(restaurant_id, data) {
        const res = await this.axios.put(`/edit/${restaurant_id}`, data);
        return res.data;
    }

    async deleteRestaurant(restaurant_id) {
        const res = await this.axios.delete(`/delete/${restaurant_id}`);
        return res.data;
    }
}

export default new RestaurantService();
