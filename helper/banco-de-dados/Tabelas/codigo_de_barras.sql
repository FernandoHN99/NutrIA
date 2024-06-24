DROP TABLE IF EXISTS codigo_de_barras CASCADE;
CREATE TABLE codigo_de_barras (
	codigo BYTEA,
	id_alimento INTEGER NOT NULL,
	CONSTRAINT codigo_de_barras_fk_id_alimento FOREIGN KEY (id_alimento) REFERENCES alimento(id_alimento) ON DELETE CASCADE,
	PRIMARY KEY (codigo)
);