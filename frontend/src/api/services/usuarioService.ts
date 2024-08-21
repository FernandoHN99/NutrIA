import api from '../apiService';
import { fazerLoginSchema } from '../schemas/usuarioSchemas';

export const fazerLogin = async (credenciais: fazerLoginSchema) => {
   return api.post(`/usuario/login`, credenciais);
};
