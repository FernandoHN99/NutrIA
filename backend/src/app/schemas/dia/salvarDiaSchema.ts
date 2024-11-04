import { z } from 'zod';
import Util from '../../../utils/util';

const salvarDiaSchema = z.object({
   id_usuario: z.string()
      .uuid('Formato Inválido: ID do Usuário'),
   
   dt_dia: z.string()
      .refine(Util.validarData, { message: 'Formato Inválido: Data do Dia' })
      .refine(data => new Date(data) < new Date(), {
         message: 'Data do dia não pode ser maior que a data atual'
      }),

   peso_dia: z.number()
      .positive().max(999.9, 
         {message: 'Formato Inválido: Peso'})
      .nullish(),

   foto_dia: z.string()
      .nullish(),

   medida_abdomen_dia: z.number()
      .positive().max(999.9, 
         {message: 'Formato Inválido: Medida de abdomen'})
      .nullish()
})
.refine(data => Object.keys(data).length > 2, {
   message: 'Nenhum dado fornecido para salvar o dia',
})

type salvarDiaObject = z.infer<typeof salvarDiaSchema>;

export { salvarDiaSchema, salvarDiaObject };