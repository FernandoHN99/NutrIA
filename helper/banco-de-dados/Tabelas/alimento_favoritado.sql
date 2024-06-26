-- Active: 1714012903894@@aws-0-sa-east-1.pooler.supabase.com@5432@postgres
DROP TABLE IF EXISTS alimento_favorito CASCADE;
CREATE TABLE alimento_favorito (
	id_usuario UUID,
	id_alimento INTEGER,
	dtt_alimento_favoritado TIMESTAMP NOT NULL,
	CONSTRAINT alimento_favorito_fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
	CONSTRAINT alimento_favorito_fk_id_alimento FOREIGN KEY (id_alimento) REFERENCES alimento(id_alimento) ON DELETE CASCADE,
	PRIMARY KEY(id_usuario, id_alimento)
);