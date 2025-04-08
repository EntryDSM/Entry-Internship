import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://stag-entry-casper-recruitment.xquare.app';

export const instance = axios.create({
  baseURL: BASE_URL,
});
