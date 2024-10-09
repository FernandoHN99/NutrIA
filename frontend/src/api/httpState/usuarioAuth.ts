import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_KEY, REFRESH_KEY } from '../../config/variaveis';

interface Tokens {
   token: string;
   refreshToken: string;
}

export const getTokensStorage = async (): Promise<Tokens> => {
   const token = await AsyncStorage.getItem(TOKEN_KEY) || '';
   const refreshToken = await AsyncStorage.getItem(REFRESH_KEY) || '';
   return { token, refreshToken };
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


const useLogout = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async () => {
         // Aqui você pode adicionar qualquer lógica de logout, se necessário.
         return Promise.resolve();  // Exemplo placeholder, substitua por uma função de logout real
      },
      onSuccess() {
         // Limpar tokens do armazenamento
         setTokensStorage('', '');

         // Atualizar o cache de tokens
         queryClient.setQueryData(['usuarioTokens'], { token: '', refreshToken: '' });
      },
      onError(error) {
         console.error('Erro ao fazer logout:', error);
         // Tratar erro, exibir notificação ou mensagem ao usuário
      },
   });
};
