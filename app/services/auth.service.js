import AxiosConfig from ".";

class AuthService extends AxiosConfig {
    constructor() {
        super('auth')
    }

    async fetchSignup(data) {
        const res = await this.axios.post("/signup", data)
        return res.data
    }

    async fetchLogin(data) {
        const res = await this.axios.post("/login", data)
        return res.data
    }

    async fetchProfile(token) {
        const res = await this.axios.post("/getprofile",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        )
        return res.data
    }

    async fetchEditUser(data) {
        const token = this.getToken()
        const res = await this.axios.put("/edit", data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        )
        return res.data
    }

    async fetchDeleteUser() {
        const token = this.getToken()
        const res = await this.axios.delete("/delete", 
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        )
        return res.data
    }
}

export default new AuthService()