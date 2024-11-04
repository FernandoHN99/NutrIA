import api from '../../config/apiService';
import { buscarAlimentosSchema } from '../schemas/alimentoSchema';
import { deletarDiaSchema, salvarDiaSchema } from '../schemas/diaSchema';

export const obterDiasService = async () => {
   try {
      const response = await api.get(`/dia/usuario`, {});
      return response.data.data;
   } catch (error) {
      throw (error as any)?.response?.data;
   }
};


export const salvarDiaService = async (bodyRequest: salvarDiaSchema) => {
   try {
      const response = await api.post(`/dia/salvar`, bodyRequest);
      console.log('responseSucesso: ', response.data.data);
      return response.data.data;
   } catch (error) {
      console.log('responseErro: ', (error as any)?.response?.data);
      throw (error as any)?.response?.data;
   }
};

export const deletarDiaService = async (bodyRequest: deletarDiaSchema) => {
   try {
      const response = await api.delete(`/dia/deletar/`, { data: bodyRequest });
      return response.data.data;
   } catch (error) {
      throw (error as any)?.response?.data;
   }
}
