import { z } from 'zod';
import { listaEstadosAlimentos, listaPerfisAlimentares } from '../../../config/variaveis';

const criarAlimentoSchema = z.object({
   
   id_usuario: z.string()
      .uuid('Formato Inválido: id_usuario'),

   nome_alimento: z.string()
      .min(1, { message: 'Inválido: nome_alimento' }),

   estado_alimento: z.string()
      .transform(estado => estado.toLocaleUpperCase())
      .refine(estado => listaEstadosAlimentos.includes(estado), {message: 'Inválido: Estado do Alimento'}),

   grupo_alimentar: z.string()
      .transform(grupo => grupo.toLocaleUpperCase())
      .refine(grupo => listaPerfisAlimentares.includes(grupo), {message: 'Inválido: Grupo Alimentar'}),

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
