import { z } from 'zod';
import { criarAlimentoPratoSchema } from './criarAlimentoPratoSchema';

const atualizarAlimentoPratoSchema = criarAlimentoPratoSchema
   .partial()
   .omit({ id_alimento: true, id_prato: true })
   .extend({
      id_alimento_prato: z.number()
         .int()
         .positive()
   })
   .refine(data => Object.keys(data).length > 1, 
      { message: 'Dados insuficientes para atualização do alimento do prato' } 
   );


type atualizarAlimentoPratoObject = z.infer<typeof atualizarAlimentoPratoSchema>

export { atualizarAlimentoPratoSchema, atualizarAlimentoPratoObject };