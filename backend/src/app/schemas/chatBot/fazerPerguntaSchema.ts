import { z } from 'zod';

const fazerPerguntaSchema = z.object({
   id_usuario: z.string()
      .uuid('Formato Inválido: ID do Usuário'),
   
   prompt_usuario: z.string().
      min(1, 'Pergunta não pode ser vazia')
});

type fazerPerguntaObject = z.infer<typeof fazerPerguntaSchema>;

export { fazerPerguntaSchema, fazerPerguntaObject };