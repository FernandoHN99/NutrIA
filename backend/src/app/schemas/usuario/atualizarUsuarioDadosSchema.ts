import { z } from 'zod';
import { criarUsuarioSchema } from './criarUsuarioSchema';

const atualizarUsuarioDadosSchema = criarUsuarioSchema.partial()
   .omit({ id_usuario: true ,email: true, password: true})
   .extend({ id_usuario: z.string().uuid('Formato Inválido: ID do Usuário') })
   .refine(data => Object.keys(data).length > 1, {
      message: 'Nenhum dado fornecido para atualização de dados',
   });

type atualizarUsuarioDadosObject = z.infer<typeof atualizarUsuarioDadosSchema>;

export { atualizarUsuarioDadosSchema, atualizarUsuarioDadosObject };

