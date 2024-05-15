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
      .nullish()
      .default(null),
   
   alimento_verificado: z.any()
      .transform(() => false),

   dtt_criacao_alimento: z.any()
      .transform(() => new Date().toISOString()),

   alimento_ativo: z.any()
      .transform(() => true)

});

type criarAlimentoObject = z.infer<typeof criarAlimentoSchema>

export { criarAlimentoSchema, criarAlimentoObject };
