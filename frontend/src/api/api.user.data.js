


class API {
    constructor() {
        this.BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
    }


    async apiPost(endpoint, payload) {
        try {
            const response = await fetch(`${this.BACKEND_URL}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            return result
        } catch (error) {
            return { message: `${error.message}`, success: false, status: 404 }
        }
    }
}


export default API;