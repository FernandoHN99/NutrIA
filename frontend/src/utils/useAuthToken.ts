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
   

   useEffect(() => {
      saveTokens('eyJhbGciOiJIUzI1NiIsImtpZCI6ImNWMEZYOU1HOWVOV0VLemwiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2t2dW9sc2FmZ2VtZGVzb3NxYWppLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJjY2QxZmI5NC1iOTZlLTRhMDEtYmEwZi0wYjVmZDcxOGM1OWUiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzI1ODk4OTU3LCJpYXQiOjE3MjU4OTg5MjcsImVtYWlsIjoiZXhhbXBsZTAxMUBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTcyNTg5ODkyN31dLCJzZXNzaW9uX2lkIjoiODE0YWZlYTItNzQ2MC00ODU5LTlhY2EtNDk0NTMzM2M5N2ZiIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.Zovj5IRws6b5Labzae68uZXiYgHKDNHvjYcgmjOtC_4', 'VQsuHKnx-9JSV7SSeyyyOw')
      loadTokens();
   }, []);
   

   const removeTokens = async () => {
      try {
         await AsyncStorage.removeItem(TOKEN_KEY);
         await AsyncStorage.removeItem(REFRESH_KEY);
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