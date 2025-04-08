import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';

export const instance = axios.create({
  baseURL: BASE_URL,
});
