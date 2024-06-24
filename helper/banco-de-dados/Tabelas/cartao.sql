DROP TABLE IF EXISTS cartao CASCADE;
CREATE TABLE cartao (
	id_usuario uuid NOT NULL,
	tipo_cartao TEXT,
	dtt_interacao_cartao TIMESTAMP,
	CONSTRAINT check_tipo_cartao CHECK (tipo_cartao IN ('DIETA FLEXIVEL', 'MACROS', 'CALORIAS')), 
	CONSTRAINT cartao_fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
	PRIMARY KEY (id_usuario, tipo_cartao)
);