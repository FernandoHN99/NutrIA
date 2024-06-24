DROP TABLE IF EXISTS refeicao CASCADE;
CREATE TABLE refeicao (
	id_usuario uuid,
	numero_refeicao SMALLINT,
	nome_refeicao TEXT NOT NULL,
	ativa BOOLEAN NOT NULL,
	dt_criacao DATE NOT NULL DEFAULT CURRENT_DATE,
	CONSTRAINT refeicao_fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
	PRIMARY KEY (id_usuario, numero_refeicao)
);