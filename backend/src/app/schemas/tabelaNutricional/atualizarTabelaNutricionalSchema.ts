import { z } from 'zod';
import { criarTabelaNutricionalSchema } from './criarTabelaNutricionalSchema';

const atualizarTabelaNutricionalSchema = criarTabelaNutricionalSchema
   .partial()
   .required({ id_usuario: true })
   .omit({ id_alimento: true, unidade_medida: true})
   .extend({
      id_tabela_nutricional: z.number()
         .int().min(1, { message: 'Campo Inválido: ID do Alimento Consumido' }),
   }
).refine(data => Object.keys(data).length > 2, {
      message: 'Nenhum dado fornecido para atualização de alimento consumido',
   });

type atualizarTabelaNutricionalObject = z.infer<typeof atualizarTabelaNutricionalSchema>

export { atualizarTabelaNutricionalSchema, atualizarTabelaNutricionalObject };
