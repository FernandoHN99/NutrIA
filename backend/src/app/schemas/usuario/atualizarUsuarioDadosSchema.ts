import { z } from 'zod';
import { criarUsuarioSchema } from './criarUsuarioSchema';

const atualizarUsuarioDadosSchema = criarUsuarioSchema
   .partial()
   .required({ id_usuario: true })
   .omit({ email: true, password: true })
   .refine(data => Object.keys(data).length > 1, {
      message: 'Nenhum dado fornecido para atualização de dados',
   });

type atualizarUsuarioDadosObject = z.infer<typeof atualizarUsuarioDadosSchema>;

export { atualizarUsuarioDadosSchema, atualizarUsuarioDadosObject };

