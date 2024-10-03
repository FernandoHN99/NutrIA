import { z } from 'zod';
import Util from '../../../utils/util';

const atualizarRefeicaoSchema = z.object({
   id_usuario: z.string()
      .uuid('Formato Inválido: ID do Usuário'),
      
   numero_refeicao: z.number().int()
         .positive('Formato Inválido: Número da Refeição'),

   nome_refeicao: z.string()
   .min(1)
   .max(25,
      {message: 'Formato Inválido: Nome da Refeição'})
   .transform((nome) => Util.capitalize(nome))
   .optional(),

   ativa: z.boolean()
      .optional()
   
}).refine(data => Object.keys(data).length > 2, {
   message: 'Nenhum dado fornecido para atualização da refeição',
});

type atualizarRefeicaoObject = z.infer<typeof atualizarRefeicaoSchema>;

export { atualizarRefeicaoSchema, atualizarRefeicaoObject };