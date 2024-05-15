import { z } from 'zod';
import Util from '../../../utils/util';

const criarRefeicaoSchema = z.object({
   id_usuario: z.string()
      .uuid('Formato Inválido: ID do Usuário'),
   
   nome_refeicao: z.string().min(1).max(25,
      { message: 'Formato Inválido: Nome da Refeição' }),
   
   ativa: z.any()
      .transform(() => true),
   
   dt_criacao: z.any()
      .transform(() => Util.criarStrData()),

   numero_refeicao: z.any()
      .transform(() => 0)

});

type criarRefeicaoObject = z.infer<typeof criarRefeicaoSchema>;

export { criarRefeicaoSchema, criarRefeicaoObject };