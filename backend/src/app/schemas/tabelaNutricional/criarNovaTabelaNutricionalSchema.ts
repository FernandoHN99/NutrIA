import { z } from 'zod';
import { criarTabelaNutricionalSchema } from './criarTabelaNutricionalSchema';

const criarNovaTabelaNutricionalSchema = criarTabelaNutricionalSchema
   .required({ id_alimento: true, id_usuario: true });

type criarNovaTabelaNutricionalObject = z.infer<typeof criarNovaTabelaNutricionalSchema>

export { criarNovaTabelaNutricionalSchema, criarNovaTabelaNutricionalObject };
