import { z } from 'zod';

const deletarAlimentoConsumidoSchema = z.object({
   id_alimento_consumido: z.number()
      .int()
      .positive(),
   
   id_usuario: z.string()
      .uuid('Formato Inválido: ID do Usuário'),

});

type deletarAlimentoConsumidoObject = z.infer<typeof deletarAlimentoConsumidoSchema>;

export { deletarAlimentoConsumidoSchema, deletarAlimentoConsumidoObject };