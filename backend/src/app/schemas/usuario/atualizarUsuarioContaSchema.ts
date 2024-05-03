import { z } from 'zod';
import { criarUsuarioSchema } from './criarUsuarioSchema';

const atualizarUsuarioContaSchema = criarUsuarioSchema.partial()
   .pick({email: true, password: true})
   .extend({ id_usuario: z.string().uuid('Formato Inválido: ID do Usuário') })
   .refine(data => Object.keys(data).length > 1, {
      message: 'Nenhum dado fornecido para atualização de conta',
   });

type atualizarUsuarioContaObject = z.infer<typeof atualizarUsuarioContaSchema>;

export { atualizarUsuarioContaSchema, atualizarUsuarioContaObject };