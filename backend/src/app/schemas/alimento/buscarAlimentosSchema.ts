import { z } from 'zod';
import Util from '../../../utils/util';

const buscarAlimentosSchema = z.object({

   nome: z.string()
      .optional(),

   pegar: z.string()
      .min(1, { message: 'offset deve ter no mínimo 1 caracter' })
      .refine(numPegar => Util.validarNumero(numPegar), { message: 'Formato Inválido: pegar' })
      .transform(numPegar => parseFloat(numPegar))
      .refine(numPegar => numPegar > 0, { message: 'Numero Inválido: pegar' }),

   pular: z.string()
      .min(1, { message: 'skip deve ter no mínimo 1 caracter' })
      .refine(numPular => Util.validarNumero(numPular), { message: 'Formato Inválido: pular' })
      .transform(numPular => parseFloat(numPular))
      .refine(numPegar => numPegar >= 0, { message: 'Numero Inválido: pular' })
})

type buscarAlimentosOject = z.infer<typeof buscarAlimentosSchema>

export { buscarAlimentosSchema, buscarAlimentosOject };
