import api from '../../config/apiService';
import { perguntarChatBotSchema } from '../schemas/chatBotSchema';

export const fazerPerguntaService = async (bodyRequest: perguntarChatBotSchema) => {
   try{
      console.log('bodyRequest', JSON.stringify(bodyRequest));
      const response = await api.post(`/chatbot/perguntar`,  bodyRequest );
      return response.data.data;
   }catch(error){
      throw (error as any)?.response?.data;
   }
};

export const analisarFotoService = async (bodyRequest: perguntarChatBotSchema) => {
   try{
      console.log('bodyRequest', JSON.stringify(bodyRequest));
      const response = await api.post(`/chatbot/analisar-foto`,  bodyRequest );
      return response.data.data;
   }catch(error){
      throw (error as any)?.response?.data;
   }
};