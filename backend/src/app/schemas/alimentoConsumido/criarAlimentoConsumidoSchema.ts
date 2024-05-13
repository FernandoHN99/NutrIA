import { z } from 'zod';
import Util from '../../../utils/util';

const criarAlimentoConsumidoSchema = z.object({
   id_usuario: z.string()
      .uuid('Formato Inválido: ID do Usuário'),

   id_alimento: z.number()
      .int().min(1, { message: 'Campo Inválido: ID do Alimento Consumido'}),
   
   numero_refeicao: z.number()
      .int().min(1, { message: 'Campo Inválido: Número da Refeição'}),
   
   id_prato: z.number()
      .int().min(1, { message: 'Campo Inválido: ID do Prato'})
      .nullable()
      .optional()
      .default(null),
   
   dt_dia: z.string()
      .refine(Util.validarData, { message: 'Formato Inválido: Data do Dia' }),
   
   unidade_medida: z.string()
      .min(1).max(10, { message: 'Campo Inválido: Unidade de Medida' })
      .transform(sistema => sistema.toLocaleUpperCase()),
   
   porcao_padrao: z.number()
      .min(0, { message: 'Campo Inválido: Porção Padrão' }),
   
   qtde_utilizada: z.number()
      .min(1).max(9999.9, { message: 'Campo Inválido: Quantidade Utilizada' }),

   qtde_proteina: z.number()
      .min(0).max(99999.9, { message: 'Campo Inválido: Quantidade de Proteína' }),

   qtde_carboidrato: z.number()
      .min(0).max(99999.9, { message: 'Campo Inválido: Quantidade de Carboidrato' }),

   qtde_gordura: z.number()
      .min(0).max(99999.9, { message: 'Campo Inválido: Quantidade de Gordura' }),

   qtde_alcool: z.number()
      .min(0).max(99999.9, { message: 'Campo Inválido: Quantidade de Álcool' }),
      
})

type criarAlimentoConsumidoObject = z.infer<typeof criarAlimentoConsumidoSchema>;

export { criarAlimentoConsumidoSchema, criarAlimentoConsumidoObject };