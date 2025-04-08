import axios from 'axios';

<<<<<<< HEAD
const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080';
=======
const BASE_URL = import.meta.env.VITE_INTERNSHIP_BASE_URL || 'http://localhost:8080';
>>>>>>> origin/fix/깃허브api

console.log('API BASE URL:', BASE_URL);

export const instance = axios.create({
  baseURL: BASE_URL,
});
