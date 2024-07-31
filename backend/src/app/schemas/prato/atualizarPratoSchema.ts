import { z } from 'zod';
import { criarPratoSchema  } from './criarPratoSchema';

const atualizarPratoSchema = criarPratoSchema
   .partial()
   .required({
      id_usuario: true
   })
   .omit({
      dtt_criacao_prato: true 
   })
   .extend({ 
      id_prato: z.number()
         .int()
         .positive() 
   })
   .refine(data => Object.keys(data).length > 2,
      { message: 'Dados insuficientes para atualização do prato' }
   );


type atualizarPratoObject = z.infer<typeof atualizarPratoSchema>;

export { atualizarPratoSchema, atualizarPratoObject };