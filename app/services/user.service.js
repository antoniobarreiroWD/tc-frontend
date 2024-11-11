import AxiosConfig from ".";

class UserService extends AxiosConfig {
    constructor() {
        super('user');
    }

    async getFavouriteRestaurants() {
        const token = this.getToken();
        const res = await this.axios.get("/getFavoriteRestaurants/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    }

    async likeRestaurant(restaurant_id) {
        const token = this.getToken();
        const res = await this.axios.put(`/likeRestaurant/${restaurant_id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    }

    async dislikeRestaurant(restaurant_id) {
        const token = this.getToken();
        const res = await this.axios.put(`/dislikeRestaurant/${restaurant_id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    }
}

export default new UserService();
