import { z } from 'zod';
import { criarTabelaNutricionalSchema } from '../tabelaNutricional/criarTabelaNutricionalSchema';
import { criarAlimentoSchema } from './criarAlimentoSchema';

const criarAlimentoCompletoSchema = criarAlimentoSchema.extend({
   tabelaNutricional: criarTabelaNutricionalSchema
});

type criarAlimentoCompletoObject = z.infer<typeof criarAlimentoCompletoSchema>

export { criarAlimentoCompletoSchema, criarAlimentoCompletoObject };