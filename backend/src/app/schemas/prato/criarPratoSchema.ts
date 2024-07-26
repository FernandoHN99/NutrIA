import { z } from 'zod';
import Util from '../../../utils/util';
import { criarAlimentoPratoSchema } from '../alimentoPrato/criarAlimentoPratoSchema';

const criarPratoSchema = z.object({

   id_usuario: z.string()
      .uuid('Formato Inválido: ID do Usuário'),
   
   nome_prato: z.string()
      .min(1, 'Nome do Prato não pode ser vazio'),

   dtt_criacao_prato: z.any()
      .transform(() => Util.criarStrData()),

   prato_favoritado: z.boolean(),

   alimentos_prato: z.array(criarAlimentoPratoSchema)
      .min(1, 'O prato deve conter pelo menos um alimento')
})

type criarPratoObject = z.infer<typeof criarPratoSchema>

export { criarPratoSchema, criarPratoObject };
