import { z } from 'zod';

const criarRefeicaoSchema = z.object({
   id_usuario: z.string()
      .uuid('Formato Inválido: ID do Usuário'),
   
   nome_refeicao: z.string().min(1).max(25,
      {message: 'Formato Inválido: Nome da Refeição'}),

});

type criarRefeicaoObject = z.infer<typeof criarRefeicaoSchema>;

export { criarRefeicaoSchema, criarRefeicaoObject };