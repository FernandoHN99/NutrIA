import api from '../../config/apiService';
import { atualizarRefeicaoSchema, criarRefeicaoSchema, deletarRefeicaoSchema, reativarRefeicaoSchema } from '../schemas/refeicaoSchema';

export const obterRefeicaoService = async () => {
   try {
      const response = await api.get(`/refeicao/usuario`, {});
      return response.data.data;
   } catch (error) {
      throw (error as any)?.response?.data;
   }
};

export const adicionarRefeicaoService = async (bodyRequest: criarRefeicaoSchema) => {
   try {
      const response = await api.post(`/refeicao/criar`, bodyRequest);
      return response.data.data;
   } catch (error) {
      throw (error as any)?.response?.data;
   }
};

export const removerRefeicaoService = async (bodyRequest: deletarRefeicaoSchema) => {
   try {
      bodyRequest.ativa = false;
      const response = await api.patch(`/refeicao/atualizar`, bodyRequest);
      return response.data.data;
   } catch (error) {
      throw (error as any)?.response?.data;
   }
};

export const reativarRefeicaoService = async (bodyRequest: reativarRefeicaoSchema) => {
   try {
      bodyRequest.ativa = true;
      const response = await api.patch(`/refeicao/atualizar`, bodyRequest);
      return response.data.data;
   } catch (error) {
      throw (error as any)?.response?.data;
   }
};

export const atualizarRefeicaoService = async (bodyRequest: atualizarRefeicaoSchema) => {
   try {
      const response = await api.patch(`/refeicao/atualizar`, bodyRequest);
      return response.data.data;
   } catch (error) {
      throw (error as any)?.response?.data;
   }
};