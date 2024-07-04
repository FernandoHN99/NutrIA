import { z } from 'zod';
import { criarTabelaNutricionalSchema } from './criarTabelaNutricionalSchema';

const criarNovaTabelaNutricionalSchema = criarTabelaNutricionalSchema
   .omit({ id_alimento: true })
   .extend({
      id_alimento: z.number()
         .int().min(1, { message: 'Campo Inválido: ID do Alimento Consumido' }),
   }
)

type criarNovaTabelaNutricionalObject = z.infer<typeof criarNovaTabelaNutricionalSchema>

export { criarNovaTabelaNutricionalSchema, criarNovaTabelaNutricionalObject };
