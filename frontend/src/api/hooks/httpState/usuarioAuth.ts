import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'authToken';
const REFRESH_KEY = 'refreshToken';

interface Tokens {
   token: string;
   refreshToken: string;
}

const getTokensStorage = async (): Promise<Tokens | null> => {
   const token = await AsyncStorage.getItem(TOKEN_KEY);
   const refreshToken = await AsyncStorage.getItem(REFRESH_KEY);
   return token && refreshToken ? { token, refreshToken } : null;
};

export const setTokensStorage = async (token: string, refreshToken: string): Promise<void> => {
   await AsyncStorage.setItem(TOKEN_KEY, token);
   await AsyncStorage.setItem(REFRESH_KEY, refreshToken);
};

export function getUserTokens(options = {}) {
   const { data } = useQuery({
      queryKey: ['usuarioTokens'],
      queryFn: getTokensStorage,
      ...options,
   });
   return { ...data };
}

