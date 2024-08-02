import { z } from 'zod';
import Util from '../../../utils/util';
import { listaNiveisDeAtividade , listaObjetivos } from '../../../config/variaveis';

const criarPerfilSchema = z.object({

   id_usuario: z.string()
      .uuid(),

   peso_inicial: z.number()
      .positive()
      .max(999.9),

   peso_final: z.number()
      .positive()
      .max(999.9),

   altura: z.number()
      .positive()
      .max(999.9),

   nivel_atividade: z.string()
      .transform(nivelAtividade => nivelAtividade.toLocaleUpperCase())
      .refine(nivelAtividade => listaNiveisDeAtividade.includes(nivelAtividade)),

   objetivo:z.string()
      .transform(objetivo => objetivo.toLocaleUpperCase())
      .refine(objetivo => listaObjetivos.includes(objetivo)),

   tmb: z.number()
      .positive()
      .int(),

   tmt: z.number()
      .positive()
      .int(),

   tmf: z.number()
      .positive()
      .int(),

   meta_proteina: z.number()
      .nonnegative()
      .int(),

   meta_carboidrato: z.number()
      .nonnegative()
      .int(),

   meta_gordura: z.number()
      .nonnegative()
      .int(),

   proteina_peso: z.number()
      .nonnegative()
      .max(99.9),

   carboidrato_peso: z.number()
      .nonnegative()
      .max(99.9),

   gordura_peso: z.number()
      .nonnegative()
      .max(99.9),

   dt_criacao_perfil: z.any()
      .transform(() => Util.criarStrData()),
});

type criarPerfilObject = z.infer<typeof criarPerfilSchema>;

export { criarPerfilSchema, criarPerfilObject };
