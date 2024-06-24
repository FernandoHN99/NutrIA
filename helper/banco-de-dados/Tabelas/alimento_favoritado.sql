DROP TABLE IF EXISTS alimento_favoritado CASCADE;
CREATE TABLE alimento_favoritado (
	id_usuario UUID,
	id_alimento INTEGER,
	dtt_alimento_favoritado TIMESTAMP NOT NULL,
	CONSTRAINT alimento_favorito_fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
	CONSTRAINT alimento_favorito_fk_id_alimento FOREIGN KEY (id_alimento) REFERENCES alimento(id_alimento) ON DELETE CASCADE,
	PRIMARY KEY(id_usuario, id_alimento)
);