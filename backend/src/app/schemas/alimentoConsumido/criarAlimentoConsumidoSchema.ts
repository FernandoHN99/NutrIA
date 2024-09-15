import { z } from 'zod';
import Util from '../../../utils/util';

const criarAlimentoConsumidoSchema = z.object({
   id_usuario: z.string()
      .uuid('Formato Inválido: ID do Usuário'),

   id_alimento: z.number()
      .int().min(1),
   
   numero_refeicao: z.number()
      .int().min(1),
   
   id_prato: z.number()
      .int().min(1)
      .nullable()
      .optional()
      .default(null),
   
   dt_dia: z.string()
      .refine(Util.validarData, { message: 'Formato Inválido: Data do Dia' }),
   
   unidade_medida: z.string()
      .min(1).max(10)
      .transform(sistema => sistema.toLocaleUpperCase()),
   
   porcao_padrao: z.number().int()
      .min(0).positive(),
   
   qtde_utilizada: z.number()
      .min(0).max(9999.9).positive(),

   qtde_proteina: z.number()
      .min(0).max(9999.9),

   qtde_carboidrato: z.number()
      .min(0).max(9999.9),

   qtde_gordura: z.number()
      .min(0).max(9999.9),

   qtde_alcool: z.number()
      .min(0).max(9999.9),

   kcal: z.number()
      .min(0).max(9999.9).positive(),
   
   dtt_alimento_consumido: z.any()
      .transform(() => new Date().toISOString()),
})

type criarAlimentoConsumidoObject = z.infer<typeof criarAlimentoConsumidoSchema>;

export { criarAlimentoConsumidoSchema, criarAlimentoConsumidoObject };