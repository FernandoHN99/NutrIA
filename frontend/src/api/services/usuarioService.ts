import api from '../apiService';
import { fazerLoginSchema } from '../schemas/usuarioSchemas';
import { criarUsuarioSchema } from '../schemas/usuarioSchemas';

export const fazerLogin = async (credenciais: fazerLoginSchema) => {
   return api.post(`/usuario/login`, credenciais);
};

export const criarUsuario = async (usuario: criarUsuarioSchema) => {
   return api.post(`/usuario/criar`, usuario);
};
