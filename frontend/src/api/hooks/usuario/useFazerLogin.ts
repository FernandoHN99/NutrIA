import { useState } from 'react';
import { fazerLoginSchema } from '../../schemas/usuarioSchemas';
import { fazerLoginService } from '../../services/usuarioService';
import { useAuthToken } from '../../../utils/useAuthToken';

const useFazerLogin = () => {
   const { saveToken } = useAuthToken()

   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const login = async (credenciais: fazerLoginSchema) => {
      setLoading(true);
      setError(null);
      try {
         const response = await fazerLoginService(credenciais);
         console.log(response?.data.data.access_token)
         saveToken(response?.data.data.access_token)
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
