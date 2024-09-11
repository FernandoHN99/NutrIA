import api from '../../config/apiService';
import { fazerLoginSchema } from '../schemas/usuarioSchemas';
import { criarUsuarioSchema } from '../schemas/usuarioSchemas';

export const fazerLoginService = async (credenciais: fazerLoginSchema) => {
   return api.post(`/usuario/login`, credenciais);
};

export const criarUsuarioService = async (usuario: criarUsuarioSchema) => {
   return api.post(`/usuario/criar`, usuario);
};


export const obterUsuarioService = async () => {
   try {
      const response = await api.get(`/usuario/obter`, {});
      return response.data.data;
   } catch (error) {
      throw (error as any)?.response?.data;
   }
};
