import { useState } from 'react';
import { fazerPerguntaService } from '../../services/chatBotService';
import { chatBotMessagesSchema } from '../../schemas/chatBotSchema';


export const useFazerPergunta = () => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const fazerPergunta = async (mensagensInput: Array<chatBotMessagesSchema>) => {
      setLoading(true);
      setError(null);
      try {
         const response = await fazerPerguntaService({mensagensChat: mensagensInput});
         setData(response.content);
      } catch (err) {
         setError((err as any)?.mensagem);
      } finally {
         setLoading(false);
      }
   };

   return { data, loading, error, fazerPergunta };

};