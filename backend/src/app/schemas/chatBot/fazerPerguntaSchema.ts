import { z } from 'zod';
import { chatMessagesSchema } from './chatMessagesSchema';

const fazerPerguntaSchema = z.object({
   id_usuario: z.string()
      .uuid('Formato Inválido: ID do Usuário'),
   
   mensagensChat: z.array(chatMessagesSchema)
      .min(1, 'Pergunta não pode ser vazia')
});

type fazerPerguntaObject = z.infer<typeof fazerPerguntaSchema>;

export { fazerPerguntaSchema, fazerPerguntaObject };