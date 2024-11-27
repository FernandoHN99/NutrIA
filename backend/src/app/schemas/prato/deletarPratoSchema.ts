import { z } from 'zod';

const deletarPratoSchema = z.object({

   id_usuario: z.string()
      .uuid('Formato Inválido: ID do Usuário'),
   
   id_prato: z.number()
      .min(1),
})

type deletarPratoObject = z.infer<typeof deletarPratoSchema>

export { deletarPratoSchema, deletarPratoObject };
