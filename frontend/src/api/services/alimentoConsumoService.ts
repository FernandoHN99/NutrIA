import api from '../../config/apiService';
import { AddAlimentoConsumidoSchema, obterConsumoUsuarioSchema } from '../schemas/alimentoConsumidoSchema';

export const obterConsumoUsuarioService = async (paramsConsumo: obterConsumoUsuarioSchema) => {
   try {
      const response = await api.get(`/alimento-consumido/usuario`, {
         params: {
            dataInicio: paramsConsumo.dataInicio,
            dataFim: paramsConsumo.dataFim
         }
      });
      return response.data.data;
   } catch (error) {
      throw (error as any)?.response?.data;
   }
};

export const addAlimentoConsumidoService = async (bodyRequest: AddAlimentoConsumidoSchema) => {
   try {
      const response = await api.post(`/alimento-consumido/criar`, { ...bodyRequest });
      return response.data.data;
   } catch (error) {
      throw (error as any)?.response?.data;
   }
};