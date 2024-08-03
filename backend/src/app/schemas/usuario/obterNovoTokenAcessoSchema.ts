import { z } from 'zod';

const obterNovoTokenAcessoSchema = z.object({

   refresh_token: z.string()
      .min(1, {message: 'Token inválido'})

})

export { obterNovoTokenAcessoSchema };
