import api from '../../config/apiService';
import { AddAlimentoConsumidoSchema, AtualizarConsumoUsuarioSchema, DeletarConsumoUsuarioSchema, obterConsumoUsuarioSchema } from '../schemas/alimentoConsumidoSchema';

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
      const response = await api.post(`/alimento-consumido/criar`, bodyRequest );
      return response.data.data;
   } catch (error) {
      throw (error as any)?.response?.data;
   }
};

export const atualizarAlimentoConsumidoService = async (bodyRequest: AtualizarConsumoUsuarioSchema): Promise<AtualizarConsumoUsuarioSchema> => {
   try {
      console.log(bodyRequest);
      const response = await api.patch(`/alimento-consumido/atualizar`, bodyRequest);
      return response.data.data;
   } catch (error) {
      throw (error as any)?.response?.data;
   }
};

export const deletarAlimentoConsumidoService = async (bodyRequest: DeletarConsumoUsuarioSchema): Promise<void> => {
   try {
      const response = await api.delete(`/alimento-consumido/deletar`, { data: bodyRequest });
      return response.data.data;
   } catch (error) {
      throw (error as any)?.response?.data;
   }
};