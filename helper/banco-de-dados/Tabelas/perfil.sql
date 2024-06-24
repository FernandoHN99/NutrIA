DROP TABLE IF EXISTS perfil CASCADE;
CREATE TABLE perfil (
	id_perfil SERIAL,
	id_usuario uuid NOT NULL,
	peso_inicial NUMERIC(4,1) NOT NULL,
	peso_final NUMERIC(4,1) NOT NULL,
	altura NUMERIC(4,1) NOT NULL,
	nivel_atividade VARCHAR(15) NOT NULL,
	objetivo VARCHAR(15) NOT NULL,
	tmb INTEGER NOT NULL,
	tmt INTEGER NOT NULL,
	tmf INTEGER NOT NULL,
	meta_proteina INTEGER NOT NULL,
	meta_carboidrato INTEGER NOT NULL,
	meta_gordura INTEGER NOT NULL,
	proteina_peso NUMERIC(3,1) NOT NULL,
	carboidrato_peso NUMERIC(3,1) NOT NULL,
	gordura_peso NUMERIC(3,1) NOT NULL,
	dt_criacao_perfil DATE NOT NULL,
	CONSTRAINT check_perfil_check_valores_maiores_que_zero CHECK (
		proteina_peso >= 0 AND carboidrato_peso >= 0 AND gordura_peso >= 0 AND 
		meta_proteina >= 0 AND meta_carboidrato >= 0 AND meta_gordura >= 0
		AND tmt > 0 AND tmf > 0 AND tmb > 0 
	),
	CONSTRAINT check_nivel_atividade CHECK (
		nivel_atividade IN ('SENDENTARIO', 'LEVE', 'MODERADO')
	), 
	CONSTRAINT check_objetivo CHECK (
		objetivo IN ('PERDA', 'MANUTENCAO', 'GANHO')
	), 
	CONSTRAINT perfil_unique_id_usuario_dt_criacao_perfil UNIQUE (id_usuario, dt_criacao_perfil),
	CONSTRAINT perfil_fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
	PRIMARY KEY (id_perfil)
);