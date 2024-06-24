DROP TABLE IF EXISTS tabela_nutricional CASCADE;
CREATE TABLE tabela_nutricional( --FALTA MAIS INFORMACOES NUTRICIONAIS
	id_alimento INTEGER,
	unidade_medida TEXT,
	porcao_padrao INTEGER,
	qtde_proteina NUMERIC(6,1) NOT NULL,
	qtde_carboidrato NUMERIC(6,1) NOT NULL,
	qtde_gordura NUMERIC(6,1) NOT NULL,
	qtde_alcool NUMERIC(6,1) NOT NULL,
	CONSTRAINT tabela_nutricional_check_valores_maiores_que_zero CHECK (
		porcao_padrao > 0 AND qtde_proteina >= 0 AND 
		qtde_carboidrato >= 0 AND qtde_gordura >= 0 AND qtde_alcool >= 0
	),
	CONSTRAINT unidade_medida CHECK (
		unidade_medida IN (
			'GRAMA', 'MILILITRO', 'COLHER SOPA', 'COLHER CHA', 
			'XICARA PADRAO', 'XICARA CHA', 'XICARA CAFE' , 'UNIDADE'
		)
	), 
	CONSTRAINT tabela_nutricional_fk_id_alimento FOREIGN KEY (id_alimento) REFERENCES alimento(id_alimento) ON DELETE CASCADE,
	PRIMARY KEY (id_alimento, unidade_medida, porcao_padrao)
);