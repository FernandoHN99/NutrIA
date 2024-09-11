import api from '../../config/apiService';
import { fazerLoginSchema } from '../schemas/usuarioSchemas';
import { criarUsuarioSchema } from '../schemas/usuarioSchemas';

export const fazerLoginService = async (credenciais: fazerLoginSchema) => {
   return api.post(`/usuario/login`, credenciais);
};

export const criarUsuarioService = async (usuario: criarUsuarioSchema) => {
   return api.post(`/usuario/criar`, usuario);
};


