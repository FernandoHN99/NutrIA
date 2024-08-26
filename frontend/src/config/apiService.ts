import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL_BACKEND } from './variaveis';

const api = axios.create({
   baseURL: URL_BACKEND,
   timeout: 10000,
   headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
   async (config) => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

export default api;