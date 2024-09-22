import api from '../../config/apiService';
import { favoritarAlimentoSchema } from '../schemas/alimentoFavoritoSchema';

export const obterAlimentosFavoritosService = async () => {
   try {
      const response = await api.get(`/alimento-favorito/usuario`);
      return response.data.data;
   } catch (error) {
      throw (error as any)?.response?.data;
   }
};

export const favoritarAlimentoService = async (bodyRequest: favoritarAlimentoSchema) => {
   try {
      const response = await api.patch(`/alimento-favorito/atualizar`, { ...bodyRequest });
      return response.data.data;
   } catch (error) {
      throw (error as any)?.response?.data;
   }
};

