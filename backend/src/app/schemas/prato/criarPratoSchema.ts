import { z } from 'zod';
import Util from '../../../utils/util';

// CREATE TABLE prato (
// 	id_prato SERIAL,
// 	id_usuario UUID,
// 	nome_prato TEXT NOT NULL,
// 	dtt_criacao_prato TIMESTAMP NOT NULL,
// 	prato_favoritado BOOLEAN NOT NULL,
// 	CONSTRAINT prato_unique_id_usuario_nome_prato UNIQUE (id_usuario, nome_prato),
// 	CONSTRAINT prato_fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
// 	PRIMARY KEY (id_prato)
// );

const criarPratoSchema = z.object({

   id_usuario: z.string()
      .uuid('Formato Inválido: ID do Usuário'),
   
   nome_prato: z.string()
      .min(1, 'Nome do Prato não pode ser vazio'),

   dtt_criacao_prato: z.any()
      .transform(() => Util.criarStrData()),

   prato_favoritado: z.boolean(),
      
})

type criarPratoObject = z.infer<typeof criarPratoSchema>

export { criarPratoSchema, criarPratoObject };
