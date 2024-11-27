import { z } from 'zod';
import Util from '../../../utils/util';

const buscarAlimentosSchema = z.object({

   nome: z.string()
      .optional()
      .default(''),

   pegar: z.string()
      .min(1, { message: 'pegar deve ter no mínimo 1 caracter' })
      .refine(numPegar => Util.validarNumeroMaiorZero(numPegar), { message: 'Formato Inválido: pegar' })
      .optional()
      .default('100'),

   pular: z.string()
      .min(1, { message: 'pegar deve ter no mínimo 1 caracter' })
      .refine(numPular => Util.validarNumeroPositivo(numPular), { message: 'Formato Inválido: pular' })
      .optional()
      .default('0'),
})

type buscarAlimentosOject = z.infer<typeof buscarAlimentosSchema>

export { buscarAlimentosSchema, buscarAlimentosOject };
