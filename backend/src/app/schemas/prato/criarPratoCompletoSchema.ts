import { z } from 'zod';
import { criarAlimentoPratoSchema } from '../alimentoPrato/criarAlimentoPratoSchema';
import { criarPratoSchema } from './criarPratoSchema';

const criarPratoCompletoSchema = criarPratoSchema.extend({
      alimentos_prato: z.array(criarAlimentoPratoSchema)
         .min(1, 'O prato deve conter pelo menos um alimento')
   })

type criarPratoCompletoObject = z.infer<typeof criarPratoCompletoSchema>

export { criarPratoCompletoSchema, criarPratoCompletoObject };
