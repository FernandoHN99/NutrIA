import api from '../../config/apiService';
import { perguntarChatBotSchema } from '../schemas/chatBotSchema';

export const fazerPerguntaService = async (bodyRequest: perguntarChatBotSchema) => {
   return api.post(`/chatbot/perguntar`, { ...bodyRequest });
};