import { useState } from 'react';
import { fazerPerguntaService } from '../../services/chatBotService';
import { chatBotMessagesSchema } from '../../schemas/chatBotSchema';
import { QueryClient } from '@tanstack/react-query';

interface IChatBotRetorno {
   acao: string | null;
   resposta: string;
   dados: object;
}

export const atualizarInfosCache = (queryClient: QueryClient, responseChatBot: IChatBotRetorno) => {
   switch (responseChatBot.acao) {
      case 'add_consumo_alimento': {
         queryClient.setQueryData(['consumoAlimentos'], (cached: any[]) => {
            return [...cached, responseChatBot.dados];
         });
         break;
      }
   }
}

export const useFazerPergunta = (queryClient: QueryClient) => {
   const [data, setData] = useState<IChatBotRetorno | null>(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const fazerPergunta = async (mensagensInput: Array<chatBotMessagesSchema>) => {
      setLoading(true);
      setError(null);
      try {
         const response: IChatBotRetorno = await fazerPerguntaService({ mensagensChat: mensagensInput });
         atualizarInfosCache(queryClient, response);
         setData(response);
      } catch (err) {
         console.log(err);
         setError((err as any)?.mensagem);
      } finally {
         setLoading(false);
      }
   };

   return { data, loading, error, fazerPergunta };

};