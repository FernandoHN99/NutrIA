import { z } from 'zod';

const deletarAlimentoPratoSchema = z.object({

   id_usuario: z.string()
      .uuid(),
         
   id_alimento_prato: z.number()
      .int()
      .positive()

});

type deletarAlimentoPratoObject = z.infer<typeof deletarAlimentoPratoSchema>

export { deletarAlimentoPratoSchema, deletarAlimentoPratoObject };

