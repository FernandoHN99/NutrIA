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
   
   
   const saveToken = async (newToken: string) => {
      try {
         await AsyncStorage.setItem(TOKEN_KEY, newToken);
         setToken(newToken);
      } catch (error) {
         console.error('Erro ao salvar token.', error);
      }
   };
   
   useEffect(() => {
      saveToken('eyJhbGciOiJIUzI1NiIsImtpZCI6ImNWMEZYOU1HOWVOV0VLemwiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2t2dW9sc2FmZ2VtZGVzb3NxYWppLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJjY2QxZmI5NC1iOTZlLTRhMDEtYmEwZi0wYjVmZDcxOGM1OWUiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzI1ODQ5OTE2LCJpYXQiOjE3MjU4NDYzMTYsImVtYWlsIjoiZXhhbXBsZTAxMUBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTcyNTg0NjMxNn1dLCJzZXNzaW9uX2lkIjoiNWNmZWI1YzUtNjAxNy00ZjAzLTkxYzQtZWRhYWJhNDQ4N2QyIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.YRPXqqwtoCJPjMDSTmucoObuM3gvL-lrQOUqZ2XHIQ4')
      loadToken();
   }, []);
   
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