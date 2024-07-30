import { z } from 'zod';
import { atualizarPratoSchema } from './atualizarPratoSchema';
import { upsertAlimentoPratoSchema } from '../alimentoPrato/upsertAlimentoPratoSchema';

const atualizarPratoCompletoSchema = atualizarPratoSchema.extend({
      alimento_prato: upsertAlimentoPratoSchema.optional()
   })

type atualizarPratoCompletoObject = z.infer<typeof atualizarPratoCompletoSchema>

export { atualizarPratoCompletoSchema, atualizarPratoCompletoObject };

