import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_URL, // backend route
    withCredentials: true,
});

export const getGithubProfile = async (id) => {
    const { data } = await api.get(`/githubapp/profile/${id}`);
    return data;
};