import { z } from 'zod';

const salvarDiaSchema = z.object({
   id_usuario: z.string()
      .uuid('Formato Inválido: ID do Usuário'),
   
   dt_dia: z.string()
      .regex(/[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])/gm, 
         {message: 'Formato Inválido: Data do Dia'})
      .refine(data => new Date(data) < new Date(), {
         message: 'Data do dia não pode ser maior que a data atual'
      }),


   peso_dia: z.number()
      .int().min(0).max(999.9, 
         {message: 'Formato Inválido: Peso'})
         .optional(),

   foto_dia: z.string()
      .optional(),

   medida_abdomen_dia: z.number()
      .int().min(0).max(999.9, 
         {message: 'Formato Inválido: Medida de abdomen'})
         .optional(),
         
})
.refine(data => Object.keys(data).length > 2, {
   message: 'Nenhum dado fornecido para salvar o dia',
});

type salvarDiaObject = z.infer<typeof salvarDiaSchema>;

export { salvarDiaSchema, salvarDiaObject };