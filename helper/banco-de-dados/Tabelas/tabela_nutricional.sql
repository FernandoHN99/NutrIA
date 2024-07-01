DROP TABLE IF EXISTS tabela_nutricional CASCADE;
CREATE TABLE tabela_nutricional(
   id_tabela_nutricional SERIAL,
	id_alimento INTEGER NOT NULL,
	unidade_medida TEXT NOT NULL,
	porcao_padrao INTEGER  NOT NULL,
   kcal NUMERIC(6,1) NOT NULL,
	qtde_proteina NUMERIC(6,1) NOT NULL,
	qtde_carboidrato NUMERIC(6,1) NOT NULL,
	qtde_gordura NUMERIC(6,1) NOT NULL,
	qtde_alcool NUMERIC(6,1),
	qtde_acucar NUMERIC(6,1),
	qtde_fibra NUMERIC(6,1),
	qtde_saturada NUMERIC(6,1),
	qtde_monosaturada NUMERIC(6,1),
	qtde_polisaturada NUMERIC(6,1),
	qtde_trans NUMERIC(6,1),
	qtde_sodio NUMERIC(6,1),
	qtde_calcio NUMERIC(6,1),
	qtde_ferro NUMERIC(6,1),
	qtde_potassio NUMERIC(6,1),
	qtde_vitamina_a NUMERIC(6,1),
	qtde_vitamina_c NUMERIC(6,1),
	qtde_vitamina_d NUMERIC(6,1),
	qtde_vitamina_e NUMERIC(6,1),
	CONSTRAINT tabela_nutricional_check_valores_maiores_que_zero CHECK (
		porcao_padrao > 0 AND qtde_proteina >= 0 AND 
		qtde_carboidrato >= 0 AND qtde_gordura >= 0 AND kcal >= 0 AND
      qtde_alcool >= 0 AND qtde_acucar >= 0 AND qtde_fibra >= 0 AND
      qtde_saturada >= 0 AND qtde_monosaturada >= 0 AND qtde_polisaturada >= 0
      AND qtde_trans >= 0 AND qtde_sodio >= 0 AND qtde_calcio >= 0 AND
      qtde_ferro >= 0 AND qtde_potassio >= 0 AND qtde_vitamina_a >= 0 AND
      qtde_vitamina_c >= 0 AND qtde_vitamina_d >= 0 AND qtde_vitamina_e >= 0
	),
	CONSTRAINT unidade_medida CHECK (
		unidade_medida IN (
			'GRAMA', 'MILILITRO', 'COLHER SOPA', 'COLHER CHA',
			'XICARA PADRAO', 'XICARA CHA', 'XICARA CAFE', 'UNIDADE'
		)
	), 
   CONSTRAINT tabela_nutricional_unique_id_alimento_unidade_porcao UNIQUE (id_alimento, unidade_medida, porcao_padrao),
	CONSTRAINT tabela_nutricional_fk_id_alimento FOREIGN KEY (id_alimento) REFERENCES alimento(id_alimento) ON DELETE CASCADE,
	PRIMARY KEY (id_tabela_nutricional)
);