import { z } from 'zod';
import { criarUsuarioSchema } from "./criarUsuarioSchema";

const atualizarUsuarioSchema = criarUsuarioSchema.partial()
.extend({ id_usuario: z.string().uuid('Formato Inválido: ID do Usuário') })
.refine(data => Object.keys(data).length > 1, {
      message: 'Nenhum dado fornecido para atualização',
});

type atualizarUsuarioObject = z.infer<typeof atualizarUsuarioSchema>;

export { atualizarUsuarioSchema, atualizarUsuarioObject };