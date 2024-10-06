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
   const { saveTokens } = useAuthToken()

   const fazerSignUp = async (input: any) => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
         const dataUsuario = criaUsuarioJSON(input);
         const criarUsuarioResponse = await criarUsuarioService(dataUsuario);

         const accessToken = criarUsuarioResponse?.data?.data?.access_token;
         const refreshToken = criarUsuarioResponse?.data?.data?.refresh_token;
         saveTokens(accessToken, refreshToken);

         const dataPerfil = criaPerfilJSON({ ...input, ...dataUsuario });
         const criarPerfilResponse = await criarPerfilService(dataPerfil);

         setData({ criarUsuarioResponse, criarPerfilResponse });
      } catch (err) {
         setError((err as any)?.response?.data?.mensagem || 'Erro');
      } finally {
         setLoading(false);
      }
   };

   return { data, error, loading, fazerSignUp };
};

export default useSignUp;