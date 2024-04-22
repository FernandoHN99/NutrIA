import { z } from 'zod';
import Util from '../../utils/util';

const usuarioSchema = z.object({

   dt_nascimento: z.string()
   .refine(data => Util.validarData(data), {
      message: 'Formato Inválido: Data de nascimento',
   })
   .refine(data => new Date(data) < new Date(), {
      message: 'Data de nascimento deve ser anterior à data atual',
   }),

   pais: z.string()
      .transform(pais => pais.toLocaleUpperCase()),

   sexo: z.string()
      .transform(sexo => sexo.toLocaleUpperCase())
      .refine(sexo => ['H', 'M'].includes(sexo), {message: 'Sexo Inválido'}),

   sistema_metrico: z.string()
      .transform(sistema => sistema.toLocaleUpperCase())
      .refine(sistema => ['METRICO', 'IMPERIAL'].includes(sistema), 
      {message: 'Sistema Métrico Inválido'}),

   perfil_alimentar: z.string()
      .transform(perfil => perfil.toLocaleUpperCase())
      .refine(perfil => ['ONIVORO', 'VEGETARIANO', 'VEGANO'].includes(perfil), 
      {message: 'Sistema Perfil Alimentar'}),
})

type criarUsuarioInputDTO = z.input<typeof usuarioSchema>
type criarUsuarioOutputDTO = z.output<typeof usuarioSchema>

export { usuarioSchema, criarUsuarioInputDTO, criarUsuarioOutputDTO };
