import axios from 'axios';
import { authService } from './authService';

const api = axios.create({
  baseURL: 'https://surveycraft-6avv.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  config => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      authService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default api;
