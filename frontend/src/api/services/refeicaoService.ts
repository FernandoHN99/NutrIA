import api from '../../config/apiService';

export const obterRefeicaoService = async () => {
   try {
      const response = await api.get(`/refeicao/usuario`, {});
      return response.data.data;
   } catch (error) {
      throw (error as any)?.response?.data;
   }
};