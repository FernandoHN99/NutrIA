import { useState } from 'react';
import { criarUsuarioService } from '../../services/usuarioService';
import { criarPerfilService } from '../../services/perfilService';
import criaUsuarioJSON from '../../../utils/criaUsuarioJSON';
import criaPerfilJSON from '../../../utils/criaPerfilJSON';
import { useAuthToken } from '../../../utils/useAuthToken';

const useSignUp = () => {
   const [data, setData] = useState<{  } | null>(null);
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(false);
   const { saveToken } = useAuthToken()

   const fazerSignUp = async (input: any) => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
         // Simula um atraso de 2 segundos (pode ser removido em produção)
         await new Promise((resolve) => setTimeout(resolve, 2000));

         // Criação do usuário
         const dataUsuario = criaUsuarioJSON(input);
         const criarUsuarioResponse = await criarUsuarioService(dataUsuario);

         // Armazenamento do token de acesso
         const accessToken = criarUsuarioResponse?.data?.data?.access_token;
         saveToken(accessToken);

         // Criação do perfil
         const dataPerfil = criaPerfilJSON({ ...input, ...dataUsuario });
         const criarPerfilResponse = await criarPerfilService(dataPerfil);

         // Define os dados retornados
         setData({ criarUsuarioResponse, criarPerfilResponse });
      } catch (err) {
         setError((err as any)?.response?.data?.mensagem || 'Erro desconhecido');
      } finally {
         // Define o estado de loading como falso
         setLoading(false);
      }
   };

   return { data, error, loading, fazerSignUp };
};

export default useSignUp;