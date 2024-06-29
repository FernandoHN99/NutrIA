import { z } from 'zod';
import { criarTabelaNutricionalSchema } from './criarTabelaNutricionalSchema';

const atualizarTabelaNutricionalSchema = criarTabelaNutricionalSchema
   .omit({ id_alimento: true, id_usuario: true})
   .partial()
   .extend({
      id_tabela_nutricional: z.number()
         .int().min(1, { message: 'Campo Inválido: ID do Alimento Consumido' }),

      id_usuario: z.string()
         .uuid('Formato Inválido: ID do Usuário'),
   }
).refine(data => Object.keys(data).length > 2, {
      message: 'Nenhum dado fornecido para atualização de alimento consumido',
   });

type atualizarTabelaNutricionalObject = z.infer<typeof atualizarTabelaNutricionalSchema>

export { atualizarTabelaNutricionalSchema, atualizarTabelaNutricionalObject };
