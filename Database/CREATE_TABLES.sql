DROP TABLE IF EXISTS usuario CASCADE;
CREATE TABLE usuario (
  id_usuario SERIAL,
  email TEXT NOT NULL UNIQUE,
  senha VARCHAR(100) NOT NULL,
  dt_nascimento DATE NOT NULL,
  dt_conta_criacao TIMESTAMP NOT NULL,
  pais TEXT NOT NULL,
  sexo TEXT NOT NULL,
  sistema_metrico VARCHAR(10) NOT NULL,
  perfil_alimentar VARCHAR(25) NOT NULL,
  CONSTRAINT check_sistema_metrico CHECK (sistema_metrico IN ('METRICO', 'IMPERIAL')), 
  CONSTRAINT check_perfil_alimentar CHECK (perfil_alimentar IN ('ONIVORO', 'VEGETARIANO', 'VEGANO')), 
  PRIMARY KEY (id_usuario)
);


DROP TABLE IF EXISTS cartao CASCADE;
CREATE TABLE cartao (
  id_usuario SERIAL,
  tipo_cartao TEXT,
  dt_interacao TIMESTAMP NOT NULL,
  CONSTRAINT check_tipo_cartao CHECK (tipo_cartao IN ('DIETA FLEXIVEL', 'MACROS', 'CALORIAS')), 
  CONSTRAINT cartao_fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  PRIMARY KEY (id_usuario, tipo_cartao)
);

 
DROP TABLE IF EXISTS perfil CASCADE;
CREATE TABLE perfil (
  id_perfil SERIAL,
  id_usuario SERIAL NOT NULL,
  peso_inicial NUMERIC(4,1) NOT NULL,
  peso_final NUMERIC(4,1) NOT NULL,
  altura NUMERIC(4,1) NOT NULL,
  nivel_atividade VARCHAR(15) NOT NULL,
  objetivo VARCHAR(15) NOT NULL,
  tmb NUMERIC(5,0) NOT NULL,
  tmt NUMERIC(5,0) NOT NULL,
  tmf NUMERIC(5,0) NOT NULL,
  meta_proteina NUMERIC(4,0) NOT NULL,
  meta_carboidrato NUMERIC(4,0) NOT NULL,
  meta_gordura NUMERIC(4,0) NOT NULL,
  dt_criacao_perfil DATE NOT NULL,
  proteina_peso NUMERIC(3,1) NOT NULL,
  carboidrato_peso NUMERIC(3,1) NOT NULL,
  gordura_peso NUMERIC(3,1) NOT NULL,
  CONSTRAINT check_nivel_atividade CHECK (nivel_atividade IN ('SENDENTARIO', 'LEVE', 'MODERADO')), 
  CONSTRAINT check_objetivo CHECK (objetivo IN ('PERDA', 'MANUTENCAO', 'GANHO')), 
  CONSTRAINT perfil_unique_id_usuario_dt_criacao_perfil UNIQUE (id_usuario, dt_criacao_perfil),
  CONSTRAINT perfil_fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  PRIMARY KEY (id_perfil)
);



DROP TABLE IF EXISTS refeicao CASCADE;
CREATE TABLE refeicao (
  id_refeicao SERIAL,
  id_usuario SERIAL,
  numero_refeicao SMALLSERIAL NOT NULL,
  nome_refeicao VARCHAR(20) NOT NULL,
  ativa BOOLEAN NOT NULL,
  CONSTRAINT refeicao_unique_id_usuario_numero_refeicao UNIQUE (id_usuario, numero_refeicao),
  CONSTRAINT refeicao_fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  PRIMARY KEY (id_refeicao)
);


DROP TABLE IF EXISTS dia CASCADE;
CREATE TABLE dia (
  id_dia BIGSERIAL,
  id_usuario SERIAL,
  data_dia DATE NOT NULL,
  peso_dia NUMERIC(4,1),
  foto_dia BYTEA,
  medida_abdomen_dia NUMERIC(4,1),
  CONSTRAINT dia_unique_id_usuario_data_dia UNIQUE (id_usuario, data_dia),
  CONSTRAINT dia_fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  PRIMARY KEY (id_dia)
);


DROP TABLE IF EXISTS alimento CASCADE;
CREATE TABLE alimento (
  id_alimento SERIAL,
  nome_alimento TEXT NOT NULL,
  estado_alimento VARCHAR(20) NOT NULL,
  alimento_verificado BOOLEAN NOT NULL,
  grupo_excludente VARCHAR(25) NOT NULL,
  marca_alimento TEXT,
  CONSTRAINT check_grupo_excludente CHECK (grupo_excludente IN ('ONIVORO', 'VEGETARIANO', 'VEGANO')), 
  CONSTRAINT check_estado_alimento CHECK (estado_alimento IN ('CRU', 'COZIDO', 'ASSADO', 'FRITO', 'GRELHADO', 'PADRAO')), 
  PRIMARY KEY (id_alimento)
);
CREATE UNIQUE INDEX alimento_unique_nome_estado_verificado_marca_grupo_excludente 
ON alimento 
(nome_alimento, estado_alimento, grupo_excludente, marca_alimento)
WHERE alimento_verificado = TRUE;


DROP TABLE IF EXISTS tabela_nutricional CASCADE;
CREATE TABLE tabela_nutricional( --FALTA MAIS INFORMACOES NUTRICIONAIS
  id_alimento SERIAL,
  unidade_medida TEXT NOT NULL,
  qtde_padrao NUMERIC(4,0) NOT NULL,
  qtde_proteina NUMERIC(5,0) NOT NULL,
  qtde_carboidrato NUMERIC(5,0) NOT NULL,
  qtde_gordura NUMERIC(5,0) NOT NULL,
  qtde_alcool NUMERIC(5,0) NOT NULL,
  CONSTRAINT unidade_medida CHECK (unidade_medida IN ('GRAMA', 'MILILITRO', 'COLHER SOPA', 'COLHER CHA', 'XICARA PADRAO', 'XICARA CHA', 'XICARA CAFE' , 'UNIDADE')), 
  CONSTRAINT tabela_nutricional_unique_unidade_medida_qtde_padrao UNIQUE (id_alimento, unidade_medida, qtde_padrao),
  CONSTRAINT tabela_nutricional_fk_id_alimento FOREIGN KEY (id_alimento) REFERENCES alimento(id_alimento) ON DELETE CASCADE
);
  

-- DROP TABLE IF EXISTS prato CASCADE;
-- CREATE TABLE prato (
--   id_prato SERIAL,
--   id_usuario SERIAL,
--   nome_prato TEXT NOT NULL,
--   dt_criacao TIMESTAMP NOT NULL,
--   dt_favorito TIMESTAMP,
--   CONSTRAINT prato_unique_id_usuario_nome_prato UNIQUE (id_usuario, nome_prato),
--   CONSTRAINT prato_fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
--   PRIMARY KEY (id_prato)
-- );

