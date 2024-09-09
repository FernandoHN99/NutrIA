import { useState } from 'react';
import { fazerLoginSchema } from '../../schemas/usuarioSchemas';
import { fazerLoginService } from '../../services/usuarioService';
import { useAuthToken } from '../../../utils/useAuthToken';

const useFazerLogin = () => {
   const { saveTokens } = useAuthToken()

   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const login = async (credenciais: fazerLoginSchema) => {
      setLoading(true);
      setError(null);
      try {
         const response = await fazerLoginService(credenciais);
         saveTokens(response?.data?.data?.access_token, response?.data?.data?.refresh_token);
         setData(response.data.data);
      } catch (err) {
         setError(JSON.stringify((err as any)?.response?.data));
      } finally {
         setLoading(false);
      }
   };

   return { data, loading, error, login };
};

export default useFazerLogin;
