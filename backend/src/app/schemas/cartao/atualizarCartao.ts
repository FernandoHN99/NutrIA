import { z } from 'zod';
import { tiposDeCartao } from '../../../config/variaveis';

const atualizarCartaoSchema = z.object({

   id_usuario: z.string()
      .uuid('Formato Inválido: ID do Usuário'),
   
   tipo_cartao: z.string()
      .transform(tipo_cartao => tipo_cartao.toLocaleUpperCase())
      .refine(tipo_cartao => tiposDeCartao.includes(tipo_cartao), 
      { message: 'Tipo de Cartão Inválido' })

})

type atualizarCartaoObject = z.infer<typeof atualizarCartaoSchema>

export { atualizarCartaoSchema, atualizarCartaoObject };
