-- usuario
DROP TABLE IF EXISTS usuario CASCADE;
CREATE TABLE usuario (
	id_usuario SERIAL,
	email TEXT NOT NULL UNIQUE,
	senha VARCHAR(100) NOT NULL,
	dt_nascimento DATE NOT NULL,
	dtt_conta_criacao TIMESTAMP NOT NULL,
	pais TEXT NOT NULL,
	sexo TEXT NOT NULL,
	sistema_metrico VARCHAR(10) NOT NULL,
	perfil_alimentar VARCHAR(20) NOT NULL,
	CONSTRAINT check_sistema_metrico CHECK (sistema_metrico IN ('METRICO', 'IMPERIAL')), 
	CONSTRAINT check_perfil_alimentar CHECK (perfil_alimentar IN ('ONIVORO', 'VEGETARIANO', 'VEGANO')), 
	PRIMARY KEY (id_usuario)
);

-- cartao
DROP TABLE IF EXISTS cartao CASCADE;
CREATE TABLE cartao (
	id_usuario INTEGER NOT NULL,
	tipo_cartao TEXT,
	dtt_interacao_cartao TIMESTAMP NOT NULL,
	CONSTRAINT check_tipo_cartao CHECK (tipo_cartao IN ('DIETA FLEXIVEL', 'MACROS', 'CALORIAS')), 
	CONSTRAINT cartao_fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
	PRIMARY KEY (id_usuario, tipo_cartao)
);

-- perfil
DROP TABLE IF EXISTS perfil CASCADE;
CREATE TABLE perfil (
	id_perfil SERIAL,
	id_usuario INTEGER NOT NULL,
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

-- refeicao
DROP TABLE IF EXISTS refeicao CASCADE;
CREATE TABLE refeicao (
	id_refeicao SERIAL,
	id_usuario INTEGER NOT NULL,
	numero_refeicao SMALLSERIAL NOT NULL,
	nome_refeicao TEXT NOT NULL,
	ativa BOOLEAN NOT NULL,
	CONSTRAINT refeicao_unique_id_usuario_numero_refeicao UNIQUE (id_usuario, numero_refeicao),
	CONSTRAINT refeicao_fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
	PRIMARY KEY (id_refeicao)
);

-- dia
DROP TABLE IF EXISTS dia CASCADE;
CREATE TABLE dia (
	id_dia BIGSERIAL,
	id_usuario INTEGER NOT NULL,
	dt_dia DATE NOT NULL,
	peso_dia NUMERIC(4,1),
	foto_dia BYTEA,
	medida_abdomen_dia NUMERIC(4,1),
	CONSTRAINT dia_unique_id_usuario_data_dia UNIQUE (id_usuario, dt_dia),
	CONSTRAINT dia_fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
	PRIMARY KEY (id_dia)
);

-- alimento
DROP TABLE IF EXISTS alimento CASCADE;
CREATE TABLE alimento (
	id_alimento SERIAL,
	nome_alimento TEXT NOT NULL,
	estado_alimento VARCHAR(20) NOT NULL,
	alimento_verificado BOOLEAN NOT NULL,
	grupo_excludente VARCHAR(25) NOT NULL,
	marca_alimento TEXT,
	CONSTRAINT check_grupo_excludente CHECK (
		grupo_excludente IN (
			'ONIVORO', 'VEGETARIANO', 'VEGANO')
	), 
	CONSTRAINT check_estado_alimento CHECK (
		estado_alimento IN (
			'CRU', 'COZIDO', 'ASSADO', 'FRITO', 'GRELHADO', 'PADRAO')
	), 
	PRIMARY KEY (id_alimento)
);
CREATE UNIQUE INDEX alimento_unique_nome_estado_verificado_marca_grupo_excludente 
ON alimento 
(nome_alimento, estado_alimento, grupo_excludente, marca_alimento)
WHERE alimento_verificado = TRUE;

-- tabela_nutricional
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

-- codigo_de_barras
DROP TABLE IF EXISTS codigo_de_barras CASCADE;
CREATE TABLE codigo_de_barras (
	codigo BYTEA,
	id_alimento INTEGER NOT NULL,
	CONSTRAINT codigo_de_barras_fk_id_alimento FOREIGN KEY (id_alimento) REFERENCES alimento(id_alimento) ON DELETE CASCADE,
	PRIMARY KEY (codigo)
);

-- alimento_favoritado
DROP TABLE IF EXISTS alimento_favoritado CASCADE;
CREATE TABLE alimento_favoritado (
	id_usuario INTEGER,
	id_alimento INTEGER,
	dtt_alimento_favoritado TIMESTAMP NOT NULL,
	CONSTRAINT alimento_favorito_fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
	CONSTRAINT alimento_favorito_fk_id_alimento FOREIGN KEY (id_alimento) REFERENCES alimento(id_alimento) ON DELETE CASCADE,
	PRIMARY KEY(id_usuario, id_alimento)
);

-- prato
DROP TABLE IF EXISTS prato CASCADE;
CREATE TABLE prato (
	id_prato SERIAL,
	id_usuario INTEGER,
	nome_prato TEXT NOT NULL,
	dtt_criacao_prato TIMESTAMP NOT NULL,
	dtt_prato_favoritado TIMESTAMP,
	CONSTRAINT prato_unique_id_usuario_nome_prato UNIQUE (id_usuario, nome_prato),
	CONSTRAINT prato_fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
	PRIMARY KEY (id_prato)
);

-- alimento_prato
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



DROP TABLE IF EXISTS alimento_consumido CASCADE;
CREATE TABLE alimento_consumido (
	id_dia BIGINT NOT NULL,
	id_alimento INTEGER NOT NULL,
	id_refeicao INTEGER NOT NULL,
	id_prato INTEGER,
	hora_insercao TIME NOT NULL,
	unidade_medida TEXT NOT NULL,
	porcao_padrao INTEGER,
	qtde_utilizada NUMERIC(5,1) NOT NULL,
	qtde_proteina NUMERIC(6,1) NOT NULL,
	qtde_carboidrato NUMERIC(6,1) NOT NULL,
	qtde_gordura NUMERIC(6,1) NOT NULL,
	qtde_alcool NUMERIC(6,1) NOT NULL,
	CONSTRAINT alimento_consumido_check_valores_maiores_que_zero CHECK (porcao_padrao > 0 AND qtde_proteina >= 0 AND 
	qtde_carboidrato >= 0 AND qtde_gordura >= 0 AND qtde_alcool >= 0 AND qtde_utilizada > 0
	),
	CONSTRAINT alimento_consumido_fk_id_dia FOREIGN KEY (id_dia) REFERENCES dia(id_dia) ON DELETE CASCADE,
	CONSTRAINT alimento_consumido_fk_id_alimento FOREIGN KEY (id_alimento) REFERENCES alimento(id_alimento),
	CONSTRAINT alimento_consumido_fk_id_refeicao FOREIGN KEY (id_refeicao) REFERENCES refeicao(id_refeicao),
	CONSTRAINT alimento_consumido_fk_id_prato FOREIGN KEY (id_prato) REFERENCES prato(id_prato)
);