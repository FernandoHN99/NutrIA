import { z } from 'zod';

const efetuarLoginSchema = z.object({

   email: z.string()
      .email('Formato Inválido: Email'),

   password: z.string()
   .min(8, {message: 'Senha deve ter no mínimo 8 caracteres'}),

})

type efetuarLoginObject = z.infer<typeof efetuarLoginSchema>

export { efetuarLoginSchema, efetuarLoginObject };
