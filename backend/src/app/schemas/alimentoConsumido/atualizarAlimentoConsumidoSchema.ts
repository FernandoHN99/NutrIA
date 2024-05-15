import { z } from 'zod';
import { criarAlimentoConsumidoSchema } from './criarAlimentoConsumidoSchema';

const atualizarAlimentoConsumidoSchema = criarAlimentoConsumidoSchema.partial()
   .omit({id_usuario: true, id_alimento: true, id_prato: true})
   .extend({
         id_alimento_consumido: z.number()
            .int().min(1, { message: 'Campo Inválido: ID do Alimento Consumido' }),
         id_usuario: z.string()
            .uuid({ message: 'Campo Inválido: ID do Usuário' })
   }

).refine(data => Object.keys(data).length > 1, {
   message: 'Nenhum dado fornecido para atualização de alimento consumido',
});


type atualizarAlimentoConsumidoObject = z.infer<typeof atualizarAlimentoConsumidoSchema>;

export { atualizarAlimentoConsumidoSchema, atualizarAlimentoConsumidoObject };