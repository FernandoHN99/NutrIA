import { z } from 'zod';

const atualizarAlimentoSchema = z.object({

   id_alimento: z.number()
      .int('Formato Inválido: id_alimento')
      .positive('Formato Inválido: id_alimento'), 

   id_usuario: z.string()
      .uuid('Formato Inválido: id_usuario'),
   
   alimento_verificado: z.boolean()
      .optional(),   

   nome_alimento: z.string()
      .min(1, { message: 'Inválido: nome_alimento' })
      .optional(),

   estado_alimento: z.string()
      .transform(estado => estado.toLocaleUpperCase())
      .refine(estado => ['CRU', 'COZIDO', 'ASSADO', 'FRITO', 'GRELHADO', 'PADRAO'].includes(estado), {message: 'Inválido: Estado do Alimento'})
      .optional(),

   grupo_excludente: z.string()
      .transform(grupo => grupo.toLocaleUpperCase())
      .refine(grupo => ['NENHUM', 'VEGETARIANO', 'VEGANO'].includes(grupo), {message: 'Inválido: Grupo Excludente'})
      .optional(),

   marca_alimento: z.string()
      .optional(),

}).refine(data => Object.keys(data).length > 2, {
   message: 'Nenhum dado fornecido para atualização do alimento',
});

type atualizarAlimentoObject = z.infer<typeof atualizarAlimentoSchema>

export { atualizarAlimentoSchema, atualizarAlimentoObject };
