import { z } from 'zod';

const criarAlimentoPratoSchema = z.object({
   
   id_prato: z.number()
      .int()
      .positive()
      .optional(),

   id_alimento: z.number()
      .int()
      .positive('Id do Alimento deve ser um número positivo'),

   unidade_medida: z.string()
      .min(1, 'Unidade de Medida não pode ser vazia'),

   porcao_padrao: z.number()
      .int()
      .positive('Porção Padrão deve ser um número positivo'),

   qtde_utilizada: z.number()
      .positive('Quantidade Utilizada deve ser um número positivo'),

   qtde_proteina: z.number()
      .nonnegative('Quantidade de Proteína não pode ser negativa'),

   qtde_carboidrato: z.number()
      .nonnegative('Quantidade de Carboidrato não pode ser negativa'),

   qtde_gordura: z.number()
      .nonnegative('Quantidade de Gordura não pode ser negativa'),

   qtde_alcool: z.number()
      .nonnegative('Quantidade de Álcool não pode ser negativa'),

   kcal: z.number()
      .nonnegative('Quantidade de Calorias não pode ser negativa')
})

type criarAlimentoPratoObject = z.infer<typeof criarAlimentoPratoSchema>

export { criarAlimentoPratoSchema, criarAlimentoPratoObject };

