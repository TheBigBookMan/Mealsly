import axios from "axios";
import { getAuth } from "firebase/auth";

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// TODO this doesnt need to happen when not auth because we want some paths to load withoput auth
api.interceptors.request.use(async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
    }, (error) => {
        return Promise.reject(error);
    }
);
  
export default api;