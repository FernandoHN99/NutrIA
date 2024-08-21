import { useState } from 'react';
import { fazerLoginSchema } from '../../schemas/usuarioSchemas';
import { fazerLogin } from '../../services/usuarioService';

const useFazerLogin = () => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const login = async (credenciais: fazerLoginSchema) => {
      setLoading(true);
      setError(null);
      try {
         const response = await fazerLogin(credenciais);
         setData(response.data);
      } catch (err) {
         setError(JSON.stringify((err as any).response.data));
      } finally {
         setLoading(false);
      }
   };

   return { data, loading, error, login };
};

export default useFazerLogin;
