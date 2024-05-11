import { z } from 'zod';
import Util from '../../../utils/util';

// CREATE TABLE alimento (
// 	id_alimento SERIAL,
//    id_usuario UUID,
// 	nome_alimento TEXT NOT NULL,
// 	estado_alimento VARCHAR(20) NOT NULL,
// 	alimento_verificado BOOLEAN NOT NULL,
// 	grupo_excludente VARCHAR(25) NOT NULL,
// 	marca_alimento TEXT,
//    dtt_criacao_alimento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// 	CONSTRAINT check_grupo_excludente CHECK (
// 		grupo_excludente IN (
// 			'ONIVORO', 'VEGETARIANO', 'VEGANO')
// 	), 
// 	CONSTRAINT check_estado_alimento CHECK (
// 		estado_alimento IN (
// 			'CRU', 'COZIDO', 'ASSADO', 'FRITO', 'GRELHADO', 'PADRAO')
// 	), 
//    CONSTRAINT alimento_fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
// 	PRIMARY KEY (id_alimento)
// );

const criarAlimentoSchema = z.object({

   id_criador: z.string()
      .uuid('Formato Inválido: id_usuario'),

   nome_alimento: z.string()
      .min(1, { message: 'Inválido: nome_alimento' }),

   estado_alimento: z.string()
      .transform(estado => estado.toLocaleUpperCase())
      .refine(estado => ['CRU', 'COZIDO', 'ASSADO', 'FRITO', 'GRELHADO', 'PADRAO'].includes(estado), {message: 'Inválido: Estado do Alimento'}),

   grupo_excludente: z.string()
      .transform(grupo => grupo.toLocaleUpperCase())
      .refine(grupo => ['NENHUM', 'VEGETARIANO', 'VEGANO'].includes(grupo), {message: 'Inválido: Grupo Excludente'}),

   marca_alimento: z.string()
      .optional(),

});

type criarAlimentoObject = z.infer<typeof criarAlimentoSchema>

export { criarAlimentoSchema, criarAlimentoObject };
