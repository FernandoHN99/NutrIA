import api from '../../config/apiService';
import { obterConsumoUsuarioSchema } from '../schemas/alimentoConsumidoSchema';
import CustomAlert from '../../components/CustomAlert';

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