import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'authToken';

export const useAuthToken = () => {
   const [token, setToken] = useState<string | null>(null);

   const loadToken = async () => {
      try {
         const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
         if (storedToken) {
            setToken(storedToken);
         }
         return storedToken;
      } catch (error) {
         console.error('Erro ao resgatar token.', error);
         return null;
      }
   };

   useEffect(() => {
      loadToken();
   }, []);

   const saveToken = async (newToken: string) => {
      try {
         await AsyncStorage.setItem(TOKEN_KEY, newToken);
         setToken(newToken);
      } catch (error) {
         console.error('Erro ao salvar token.', error);
      }
   };

   const removeToken = async () => {
      try {
         await AsyncStorage.removeItem(TOKEN_KEY);
         setToken(null);
      } catch (error) {
         console.error('Erro ao remover token.', error);
      }
   };

   return {
      token,
      loadToken,
      saveToken,
      removeToken,
   };
};