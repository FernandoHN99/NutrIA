import api from '../../config/apiService';
import criaPerfilJSON from '../../utils/criaPerfilJSON';
import criaUsuarioJSON from '../../utils/criaUsuarioJSON';
import { fazerLoginSchema } from '../schemas/usuarioSchemas';
import { criarUsuarioSchema } from '../schemas/usuarioSchemas';
import { setTokensStorage } from '../httpState/usuarioAuth';
import { criarPerfilService } from './perfilService';
import { useQueryClient } from '@tanstack/react-query';


export const fazerLoginService = async (credenciais: fazerLoginSchema) => {
   try{
      const response = await api.post(`/usuario/login`, credenciais);
      return response.data.data;
   }
   catch(error){
      throw (error as any)?.response?.data;
   }
};

export const fazerLogoutService = async (queryClient: any) => {
   try{
      setTokensStorage('', '');
      queryClient.setQueryData(['usuarioTokens'], () => {
         return {token: '', refreshToken: ''};
      });
      queryClient.clear();
   }
   catch(error){
      throw (error as any)?.response?.data;
   }
};

export const criarUsuarioService = async (usuario: criarUsuarioSchema) => {
   try{
      const response = await api.post(`/usuario/criar`, usuario);
      return response.data.data;
   }
   catch(error){
      throw (error as any)?.response?.data;
   }
};

export const fazerSignUpService = async (input: Object) => {
   try{
      const dataUsuario = criaUsuarioJSON(input);
      const criarUsuarioResponse = await criarUsuarioService(dataUsuario);
      setTokensStorage(criarUsuarioResponse?.access_token, criarUsuarioResponse?.refresh_token)
      const dataPerfil = criaPerfilJSON({ ...input, ...dataUsuario });
      const criarPerfilResponse = await criarPerfilService(dataPerfil);
      return {criarUsuarioResponse, criarPerfilResponse};
   }
   catch(error){
      throw (error as any)?.response?.data;
   }
};


export const obterUsuarioService = async () => {
   try {
      const response = await api.get(`/usuario/obter`, {});
      return response.data.data;
   } catch (error) {
      throw (error as any)?.response?.data;
   }
};
