import { z } from 'zod';
import { criarAlimentoPratoSchema } from './criarAlimentoPratoSchema';
import { atualizarAlimentoPratoSchema } from './atualizarAlimentoPratoSchema';

const upsertAlimentoPratoSchema = z.union([
   atualizarAlimentoPratoSchema,
   criarAlimentoPratoSchema
])
.refine((data) => {
   if ('id_alimento_prato' in data) {
      return atualizarAlimentoPratoSchema.safeParse(data).success;
   }
   return criarAlimentoPratoSchema.safeParse(data).success;
});

type upsertAlimentoPratoObject = z.infer<typeof upsertAlimentoPratoSchema>

export { upsertAlimentoPratoSchema, upsertAlimentoPratoObject };


