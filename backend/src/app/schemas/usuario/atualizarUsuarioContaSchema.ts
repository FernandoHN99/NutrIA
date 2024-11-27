import { z } from 'zod';
import { criarUsuarioSchema } from './criarUsuarioSchema';

const atualizarUsuarioContaSchema = criarUsuarioSchema
   .partial()
   .pick({ email: true, password: true, id_usuario: true })
   .required({ id_usuario: true })
   .refine(data => Object.keys(data).length > 1, {
      message: 'Nenhum dado fornecido para atualização de conta',
   });

type atualizarUsuarioContaObject = z.infer<typeof atualizarUsuarioContaSchema>;

export { atualizarUsuarioContaSchema, atualizarUsuarioContaObject };