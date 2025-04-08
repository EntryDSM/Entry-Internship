import axios from 'axios';

const BASE_URL = import.meta.env.VITE_INTERNSHIP_BASE_URL || 'http://localhost:8080';

console.log('API BASE URL:', BASE_URL);

export const instance = axios.create({
  baseURL: BASE_URL,
});
