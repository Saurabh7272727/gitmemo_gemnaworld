import axios from 'axios';
import { encryptPayload, decryptPayload } from '../utils/encryption.js';

const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL || '';
const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY || 'default_secret_key_32_chars_long!';

const etagStorage = {
    get(key) {
        try {
            return localStorage.getItem(`etag:${key}`);
        } catch {
            return null;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(`etag:${key}`, value);
        } catch {
            // ignore storage errors
        }
    },
    getCachedResponse(key) {
        try {
            return JSON.parse(localStorage.getItem(`cache:${key}`));
        } catch {
            return null;
        }
    },
    setCachedResponse(key, value) {
        try {
            localStorage.setItem(`cache:${key}`, JSON.stringify(value));
        } catch {
            // ignore
        }
    },
};

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    if (SECRET_KEY) {
        config.headers['X-Encrypted-Payload'] = 'true';
        if (config.data && typeof config.data === 'object') {
            config.data = { payload: encryptPayload(config.data, SECRET_KEY) };
        }
    }

    // Add userId to headers if available
    const userId = localStorage.getItem('userId');
    if (userId) {
        config.headers['X-User-Id'] = userId;
    }

    const etag = etagStorage.get(config.url);
    if (etag) {
        config.headers['If-None-Match'] = etag;
    }

    return config;
});

api.interceptors.response.use(
    (response) => {
        if (response.status === 304) {
            const cached = etagStorage.getCachedResponse(response.config.url);
            if (cached) {
                return { ...response, data: cached };
            }
        }

        if (response.data?.encryptedPayload && SECRET_KEY) {
            const decrypted = decryptPayload(response.data.encryptedPayload, SECRET_KEY);
            response.data = decrypted;
        }

        const etag = response.headers?.etag;
        if (etag) {
            etagStorage.set(response.config.url, etag);
            etagStorage.setCachedResponse(response.config.url, response.data);
        }

        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
