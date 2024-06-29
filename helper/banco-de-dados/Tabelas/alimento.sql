DROP TABLE IF EXISTS alimento CASCADE;
CREATE TABLE alimento (
	id_alimento SERIAL,
   id_usuario UUID,
	nome_alimento TEXT NOT NULL,
	estado_alimento VARCHAR(20) NOT NULL,
	alimento_verificado BOOLEAN NOT NULL,
	grupo_alimentar VARCHAR(25) NOT NULL,
	marca_alimento TEXT,
   dtt_criacao_alimento TIMESTAMP NOT NULL,
   alimento_ativo BOOLEAN NOT NULL
	CONSTRAINT check_grupo_alimentar CHECK (
		grupo_alimentar IN (
			'ONIVORO', 'VEGETARIANO', 'VEGANO')
	), 
	CONSTRAINT check_estado_alimento CHECK (
		estado_alimento IN (
			'CRU', 'COZIDO', 'ASSADO', 'FRITO', 'GRELHADO', 'PADRAO')
	), 
   CONSTRAINT alimento_fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
	PRIMARY KEY (id_alimento)
);

CREATE UNIQUE INDEX alimento_unique_nome_estado_verificado_marca_grupo_alimentar
ON alimento 
(nome_alimento, estado_alimento, grupo_alimentar, marca_alimento)
WHERE alimento_verificado = TRUE;