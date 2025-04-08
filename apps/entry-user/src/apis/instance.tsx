import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://stag-entry-casper-recruitment.xquare.app',
});
//import.meta.env.VITE_BASE_URL
