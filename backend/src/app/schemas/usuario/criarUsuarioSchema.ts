import { z } from 'zod';
import Util from '../../../utils/util';

const criarUsuarioSchema = z.object({

   email: z.string()
      .email('Formato Inválido: Email'),

   password: z.string()
      .min(8, { message: 'Senha deve ter no mínimo 8 caracteres' }),

   nome: z.string()
      .min(1, { message: 'Nome deve ter no mínimo 1 caracter' })
      .transform(nome => Util.capitalize(nome)),

   sobrenome: z.string()
      .min(1, { message: 'Sobrenome deve ter no mínimo 1 caracter' })
      .transform(sobrenome => Util.capitalize(sobrenome)),

   dt_nascimento: z.string()
      .refine(data => Util.validarData(data), {
         message: 'Formato Inválido: Data de nascimento'})
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
         { message: 'Perfil Alimentar Inválido' }),
})

type criarUsuarioObject = z.infer<typeof criarUsuarioSchema>

export { criarUsuarioSchema, criarUsuarioObject };
