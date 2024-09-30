import { useState } from 'react';
import { fazerPerguntaService } from '../../services/chatBotService';
import { perguntarChatBotSchema } from '../../schemas/chatBotSchema';

export const useFazerPergunta = () => {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const fazerPergunta = async (userMessage: string) => {
      setLoading(true);
      setError(null);
      try {
         const response = await fazerPerguntaService({ prompt_usuario: userMessage } as perguntarChatBotSchema);
         setData(response.data.data.resposta);
      } catch (err) {
         setError((err as any)?.response?.data.mensagem);
      } finally {
         setLoading(false);
      }
   };

   return { data, loading, error, fazerPergunta };

};