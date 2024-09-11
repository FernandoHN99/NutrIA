import api from '../../config/apiService';
import { criarPerfilSchema } from '../schemas/perfilSchemas';

export const criarPerfilService = async (perfil: criarPerfilSchema) => {
   return api.post(`/perfil/criar`, perfil);
};

export const obterPerfilService = async () => {
   try {
      const response = await api.get(`/perfil/usuario`, {});
      return response.data.data;
   } catch (error) {
      throw (error as any)?.response?.data;
   }
};
