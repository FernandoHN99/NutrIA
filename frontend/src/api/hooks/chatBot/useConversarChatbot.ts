import { useState } from 'react';
import { fazerPerguntaService, analisarFotoService } from '../../services/chatBotService';
import { chatBotMessagesSchema } from '../../schemas/chatBotSchema';
import { QueryClient } from '@tanstack/react-query';

interface IChatBotRetorno {
   acao: string | null;
   resposta: string;
   dados: any;
}

export const atualizarInfosCache = async (queryClient: QueryClient, responseChatBot: IChatBotRetorno) => {
   switch (responseChatBot.acao) {
      case 'add_consumo_alimento': {
         await queryClient.setQueryData(['consumoAlimentos'], (cached: any[]) => {
            return [...cached, ...responseChatBot.dados];
         });
         break;
      }
   }
}

export const useConversarChatbot = (queryClient: QueryClient) => {
   const [data, setData] = useState<IChatBotRetorno | null>(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const conversarChatbot = async (mensagensInput: Array<chatBotMessagesSchema>, contemImg: boolean) => {
      setLoading(true);
      setError(null);
      try {
         const response: IChatBotRetorno = !contemImg 
         ? await fazerPerguntaService({ mensagensChat: mensagensInput })
         : await analisarFotoService({ mensagensChat: mensagensInput })
         await atualizarInfosCache(queryClient, response);
         console.log(response);
         setData(response);
      } catch (err) {
         setError((err as any));
      } finally {
         setLoading(false);
         // setData(null);
      }
   };

   return { data, loading, error, conversarChatbot };

};