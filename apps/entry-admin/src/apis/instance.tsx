import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_INTERNSHIP_BASE_URL,
});
