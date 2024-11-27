import { z } from 'zod';
import { criarAlimentoConsumidoSchema } from './criarAlimentoConsumidoSchema';

const atualizarAlimentoConsumidoSchema = criarAlimentoConsumidoSchema.innerType()
   .partial()
   .required({ id_usuario: true })
   .omit({ id_alimento: true, id_prato: true, dtt_alimento_consumido: true})
   .extend({
         id_alimento_consumido: z.number()
            .int()
            .min(1, { message: 'Campo Inválido: ID do Alimento Consumido' }),
   }

).refine(data => Object.keys(data).length > 2, {
   message: 'Nenhum dado fornecido para atualização de alimento consumido',
});



type atualizarAlimentoConsumidoObject = z.infer<typeof atualizarAlimentoConsumidoSchema>;

export { atualizarAlimentoConsumidoSchema, atualizarAlimentoConsumidoObject };