DROP TABLE IF EXISTS alimento_prato CASCADE;
CREATE TABLE alimento_prato ( 
	id_prato INTEGER NOT NULL,
	id_alimento INTEGER NOT NULL,
	unidade_medida TEXT NOT NULL,
	porcao_padrao INTEGER,
	qtde_utilizada NUMERIC(5,1) NOT NULL,
	qtde_proteina NUMERIC(6,1) NOT NULL,
	qtde_carboidrato NUMERIC(6,1) NOT NULL,
	qtde_gordura NUMERIC(6,1) NOT NULL,
	qtde_alcool NUMERIC(6,1) NOT NULL,
	dtt_favorito TIMESTAMP,
	CONSTRAINT alimento_prato_check_valores_maiores_que_zero CHECK (
		porcao_padrao > 0 AND qtde_proteina >= 0 AND 
		qtde_carboidrato >= 0 AND qtde_gordura >= 0 AND qtde_alcool >= 0 AND qtde_utilizada > 0
	),
	CONSTRAINT unidade_medida CHECK (
		unidade_medida IN (
			'GRAMA', 'MILILITRO', 'COLHER SOPA', 'COLHER CHA', 'XICARA PADRAO',
			'XICARA CHA', 'XICARA CAFE' , 'UNIDADE'
		)
	), 
	CONSTRAINT alimento_prato_fk_id_prato FOREIGN KEY (id_prato) REFERENCES prato(id_prato) ON DELETE CASCADE,
	CONSTRAINT alimento_prato_fk_id_alimento FOREIGN KEY (id_alimento) REFERENCES alimento(id_alimento) ON DELETE CASCADE
);