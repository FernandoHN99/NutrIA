import api from '../../config/apiService';
import { criarPerfilSchema } from '../schemas/perfilSchemas';

export const criarPerfilService = async (perfil: criarPerfilSchema) => {
   return api.post(`/perfil/criar`, perfil);
};
