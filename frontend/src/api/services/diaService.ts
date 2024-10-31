import api from '../../config/apiService';
import { buscarAlimentosSchema } from '../schemas/alimentoSchema';

export const obterDiasService = async () => {
   try {
      const response = await api.get(`/dia/usuario`, {});
      return response.data.data;
   } catch (error) {
      throw (error as any)?.response?.data;
   }
};

