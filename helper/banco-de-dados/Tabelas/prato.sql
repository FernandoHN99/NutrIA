DROP TABLE IF EXISTS prato CASCADE;
CREATE TABLE prato (
	id_prato SERIAL,
	id_usuario UUID,
	nome_prato TEXT NOT NULL,
	dtt_criacao_prato TIMESTAMP NOT NULL,
	dtt_prato_favoritado TIMESTAMP,
	CONSTRAINT prato_unique_id_usuario_nome_prato UNIQUE (id_usuario, nome_prato),
	CONSTRAINT prato_fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
	PRIMARY KEY (id_prato)
);