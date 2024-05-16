import { z } from 'zod';
import Util from '../../../utils/util';

const deletarDiaSchema = z.object({
   id_usuario: z.string()
      .uuid('Formato Inválido: ID do Usuário'),
   
   dt_dia: z.string()
      .refine(Util.validarData, { message: 'Formato Inválido: Data do Dia' })
      .refine(data => new Date(data) < new Date(), {
         message: 'Data do dia não pode ser maior que a data atual'
      }),
})
.refine(data => Object.keys(data).length = 2, {
   message: 'Dados insuficientes para deletar o dia',
})

type deletarDiaObject = z.infer<typeof deletarDiaSchema>;

export { deletarDiaSchema, deletarDiaObject };