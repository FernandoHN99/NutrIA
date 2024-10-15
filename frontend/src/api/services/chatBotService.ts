import api from '../../config/apiService';
import { perguntarChatBotSchema } from '../schemas/chatBotSchema';

export const fazerPerguntaService = async (bodyRequest: perguntarChatBotSchema) => {
   try{
      const response = await api.post(`/chatbot/perguntar`,  bodyRequest );
      console.log(response.data.data);
      return response.data.data;
   }catch(error){
      throw (error as any)?.response?.data;
   }
};