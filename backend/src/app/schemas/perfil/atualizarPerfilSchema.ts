import { z } from 'zod';
import { criarPerfilSchema } from './criarPerfilSchema';

const atualizarPerfilSchema = criarPerfilSchema
   .partial()
   .required({ id_usuario: true })
   .omit({ dt_criacao_perfil: true })
   .extend({ 
      id_perfil: z.number()
         .int()
         .positive()
   })
   .refine(data => Object.keys(data).length > 2, {
      message: 'Dados insuficientes para atualizar o perfil',
   })


type atualizarPerfilObject = z.infer<typeof atualizarPerfilSchema>;

export { atualizarPerfilSchema, atualizarPerfilObject };
