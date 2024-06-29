import { z } from 'zod';
import { listaEstadosAlimentos, listaPerfisAlimentares } from '../../../config/variaveis';
import { criarTabelaNutricionalSchema } from '../tabelaNutricional/criarTabelaNutricionalSchema';
import { criarAlimentoSchema } from './criarAlimentoSchema';
const criarAlimentoTabelaSchema = criarAlimentoSchema.merge(criarTabelaNutricionalSchema);

type criarAlimentoTabelaObject = z.infer<typeof criarAlimentoTabelaSchema>

export { criarAlimentoTabelaSchema, criarAlimentoTabelaObject };