
import { z } from 'zod';
import { criarAlimentoConsumidoSchema } from './criarAlimentoConsumidoSchema';

const criarAlimentoConsumidoCompletoSchema = z.object({
   
   id_usuario: z.string()
      .uuid('Formato Inválido: ID do Usuário'),

   alimentosConsumidos: z.array(criarAlimentoConsumidoSchema)

})

type criarAlimentoConsumidoCompletoObject = z.infer<typeof criarAlimentoConsumidoCompletoSchema>;

export { criarAlimentoConsumidoCompletoSchema, criarAlimentoConsumidoCompletoObject };