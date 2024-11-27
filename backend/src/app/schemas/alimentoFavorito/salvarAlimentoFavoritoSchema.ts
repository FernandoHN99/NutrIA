import { z } from 'zod';

const salvarAlimentoFavoritoSchema = z.object({
   id_usuario: z.string()
      .uuid('Formato Inválido: ID do Usuário'),
   
      id_alimento: z.number()
      .int().min(1),

   dtt_alimento_favoritado: z.any()
      .transform(() => new Date().toISOString())

})

type salvarAlimentoFavoritoObject = z.infer<typeof salvarAlimentoFavoritoSchema>;

export { salvarAlimentoFavoritoSchema, salvarAlimentoFavoritoObject };