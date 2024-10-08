import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'authToken';
const REFRESH_KEY = 'refreshToken';

export const useAuthToken = () => {
   const [token, setToken] = useState<string | null>(null);
   const [refreshToken, setRefreshToken] = useState<string | null>(null);


   const loadTokens = async (): Promise<{ token: string | null, refreshToken: string | null }> => {
      try {
         const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
         const storedRefreshToken = await AsyncStorage.getItem(REFRESH_KEY);
         if (storedToken && storedRefreshToken) {
            setToken(storedToken);
            setRefreshToken(storedRefreshToken);
         }
         return { token: storedToken, refreshToken: storedRefreshToken };
      } catch (error) {
         console.error('Erro ao resgatar tokens.', error);
         return { token: null, refreshToken: null };
      }
   };
   
   
   const saveTokens = async (newToken: string, newRefreshToken: string ) => {
      try {
         await AsyncStorage.setItem(TOKEN_KEY, newToken);
         await AsyncStorage.setItem(REFRESH_KEY, newRefreshToken);
         setToken(newToken);
         setRefreshToken(newRefreshToken);
      } catch (error) {
         console.error('Erro ao salvar tokens.', error);
      }
   };   

   const removeTokens = async () => {
      try {
         await AsyncStorage.setItem(TOKEN_KEY, '');
         await AsyncStorage.setItem(REFRESH_KEY, '');
         console.log('Tokens removidos.');
         setToken(null);
         setRefreshToken(null);
      } catch (error) {
         console.error('Erro ao remover tokens.', error);
      }
   };


   return {
      token,
      refreshToken,
      loadTokens,
      saveTokens,
      removeTokens,
   };
};