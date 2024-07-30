import { z } from 'zod';
import { criarAlimentoSchema } from './criarAlimentoSchema';

const atualizarAlimentoSchema = criarAlimentoSchema
   .partial()
   .required({
      id_usuario: true,
   })
   .omit({ dtt_criacao_alimento: true, alimento_verificado: true, alimento_ativo: true })
   .extend({
      id_alimento: z.number()
         .int()
         .positive(),

      alimento_verificado: z.boolean()
         .optional(),
   
      alimento_ativo: z.boolean()
         .optional()
   })
   .refine(
      data => Object.keys(data).length > 2, 
      { message: 'Nenhum dado fornecido para atualização' } 
   );


type atualizarAlimentoObject = z.infer<typeof atualizarAlimentoSchema>

export { atualizarAlimentoSchema, atualizarAlimentoObject };
