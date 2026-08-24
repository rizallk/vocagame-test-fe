import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://vocagame-mock-api.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
