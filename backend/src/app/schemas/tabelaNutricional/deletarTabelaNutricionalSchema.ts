import { z } from 'zod';

const deletarTabelaNutricionalSchema = z.object({
   id_usuario: z.string()
      .uuid(),

   id_tabela_nutricional: z.number()
      .int()
      .positive(),
});

type deletarTabelaNutricionalObject = z.infer<typeof deletarTabelaNutricionalSchema>

export { deletarTabelaNutricionalSchema, deletarTabelaNutricionalObject };
