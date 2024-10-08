import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL_BACKEND, listaRotasSemAuth} from './variaveis';

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

const refreshAuthTokens = async () => {
   try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (!refreshToken) {
         console.error('Refresh token não encontrado.');
         throw new Error('Refresh token não encontrado.');
      }
      const response = await axios.post(
         `${URL_BACKEND}/usuario/refresh-token`,
         { refresh_token: refreshToken },
         {
            headers: {
               'Content-Type': 'application/json',
            },
         }
      );

      const { access_token, refresh_token } = response.data.data;
      await AsyncStorage.setItem('authToken', access_token);
      await AsyncStorage.setItem('refreshToken', refresh_token);
      return { token: access_token, refreshToken: refresh_token };
   } catch (error) {
      console.error('Erro ao atualizar o token:', (error as any)?.response?.data);
      throw error;
   }
};

api.interceptors.response.use(
   (response) => response,
   async (error) => {
      const originalRequest = error.config;
      if(!listaRotasSemAuth.includes(originalRequest.url)){
         if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
               console.log('api.interceptors: ', originalRequest);
               const { token } = await refreshAuthTokens();
               api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
               originalRequest.headers['Authorization'] = `Bearer ${token}`;
               return api(originalRequest);
            } catch (error) {
               return Promise.reject(error);
            }
         }
      }
      return Promise.reject(error);
   }
);

export default api;