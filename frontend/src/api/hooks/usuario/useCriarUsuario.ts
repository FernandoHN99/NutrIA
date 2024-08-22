import { useState } from 'react';
import { criarUsuarioSchema } from '../../schemas/usuarioSchemas';
import { criarUsuario } from '../../services/usuarioService';

const useCriarUsuario = () => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const login02 = async (usuarioDados: criarUsuarioSchema) => {
      setLoading(true);
      setError(null);
      try {
         const response = await criarUsuario(usuarioDados);
         setData(response.data);
      } catch (err) {
         setError(JSON.stringify((err as any)?.response?.data));
      } finally {
         setLoading(false);
      }
   };

   return { data, loading, error, login02 };
};

export default useCriarUsuario;
