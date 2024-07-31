import { z } from 'zod';
import { listaUnidadesMedida } from '../../../config/variaveis';

const criarTabelaNutricionalSchema = z.object({

   id_usuario: z.string()
      .uuid()
      .optional(),

   id_alimento: z.number()
      .positive()
      .optional(),

   unidade_medida: z.string()
      .transform(unidade_medida => unidade_medida.toLocaleUpperCase())
      .refine(unidade_medida => listaUnidadesMedida.includes(unidade_medida), { message: 'Inválido: unidade_medida' }),

   porcao_padrao: z.number()
      .int()
      .positive('Formato Inválido: porcao_padrao'),

   kcal: z.number()
      .nonnegative('Formato Inválido: kcal'),

   qtde_proteina: z.number()
      .nonnegative('Formato Inválido: qtde_proteina'),

   qtde_carboidrato: z.number()
      .nonnegative('Formato Inválido: qtde_carboidrato'),

   qtde_gordura: z.number()
      .nonnegative(),

   qtde_alcool: z.number()
      .nonnegative()
      .nullable(),

   qtde_acucar: z.number()
      .nonnegative()
      .nullable(),

   qtde_fibra: z.number()
      .nonnegative()
      .nullable(),

   qtde_saturada: z.number()
      .nonnegative()
      .nullable(),

   qtde_monosaturada: z.number()
      .nonnegative()
      .nullable(),

   qtde_polisaturada: z.number()
      .nonnegative()
      .nullable(),

   qtde_trans: z.number()
      .nonnegative()
      .nullable(),

   qtde_sodio: z.number()
      .nonnegative()
      .nullable(),

   qtde_calcio: z.number()
      .nonnegative()
      .nullable(),

   qtde_ferro: z.number()
      .nonnegative()
      .nullable(),

   qtde_potassio: z.number()
      .nonnegative()
      .nullable(),

   qtde_vitamina_a: z.number()
      .nonnegative()
      .nullable(),

   qtde_vitamina_c: z.number()
      .nonnegative()
      .nullable(),

   qtde_vitamina_d: z.number()
      .nonnegative()
      .nullable(),

   qtde_vitamina_e: z.number()
      .nonnegative()
      .nullable(),

});

type criarTabelaNutricionalObject = z.infer<typeof criarTabelaNutricionalSchema>

export { criarTabelaNutricionalSchema, criarTabelaNutricionalObject };
