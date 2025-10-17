import axios from 'axios';

const apiBase = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export const api = axios.create({
    baseURL: apiBase,
    headers: {
        'Content-Type': 'application/json',
    },
});