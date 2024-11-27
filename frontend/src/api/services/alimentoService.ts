import api from '../../config/apiService';
import { buscarAlimentosSchema } from '../schemas/alimentoSchema';

export const buscarAlimentosService = async (paramsConsumo: buscarAlimentosSchema) => {
   try {
      const response = await api.get(`/alimento/buscar`, {
         params: {
            nome: paramsConsumo.nome,
            pegar: paramsConsumo.pegar,
            pular: paramsConsumo.pular
         }
      });
      return response.data.data;
   } catch (error) {
      throw (error as any)?.response?.data;
   }
};

