import api from '../../config/apiService';
import { perguntarChatBotSchema } from '../schemas/chatBotSchema';

export const fazerPerguntaService = async (bodyRequest: perguntarChatBotSchema) => {
   try{
      console.log('bodyRequest', bodyRequest);
      const response = await api.post(`/chatbot/perguntar`,  bodyRequest );
      return response.data.data;
   }catch(error){
      throw (error as any)?.response?.data;
   }
};