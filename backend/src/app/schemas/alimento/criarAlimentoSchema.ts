import { z } from 'zod';

const criarAlimentoSchema = z.object({
   
   id_usuario: z.string()
      .uuid('Formato Inválido: id_usuario'),

   nome_alimento: z.string()
      .min(1, { message: 'Inválido: nome_alimento' }),

   estado_alimento: z.string()
      .transform(estado => estado.toLocaleUpperCase())
      .refine(estado => ['CRU', 'COZIDO', 'ASSADO', 'FRITO', 'GRELHADO', 'PADRAO'].includes(estado), {message: 'Inválido: Estado do Alimento'}),

   grupo_excludente: z.string()
      .transform(grupo => grupo.toLocaleUpperCase())
      .refine(grupo => ['NENHUM', 'VEGETARIANO', 'VEGANO'].includes(grupo), {message: 'Inválido: Grupo Excludente'}),

   marca_alimento: z.string().min(1)
      .nullable()
      .optional()
      .default(null),
   
   alimento_verificado: z.boolean()
      .transform(() => false)
      .optional()
      .default(false),

   dtt_criacao_alimento: z.string()
      .transform(() => new Date().toISOString())
      .optional()
      .default(new Date().toISOString()),

   alimento_ativo: z.boolean()
      .transform(() => true)
      .optional()
      .default(true)

});

type criarAlimentoObject = z.infer<typeof criarAlimentoSchema>

export { criarAlimentoSchema, criarAlimentoObject };
