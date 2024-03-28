-- usuario
INSERT INTO usuario (email, senha, dt_nascimento, dt_conta_criacao, pais, sexo, sistema_metrico, tipo_alimentacao) VALUES ('example01@example.com', 'password123', '1990-01-01', CURRENT_TIMESTAMP, 'Brazil', 'Male', 'METRICO', 'VEGETARIANO');
INSERT INTO usuario (email, senha, dt_nascimento, dt_conta_criacao, pais, sexo, sistema_metrico, tipo_alimentacao) VALUES ('example02@example.com', 'password123', '1990-01-01', CURRENT_TIMESTAMP, 'Brazil', 'Male', 'METRICO', 'VEGANO');

-- cartao
INSERT INTO cartao (id_usuario, tipo_cartao, dt_interacao) VALUES (1, 'MACROS', CURRENT_TIMESTAMP);
INSERT INTO cartao (id_usuario, tipo_cartao, dt_interacao) VALUES (1, 'CALORIAS', CURRENT_TIMESTAMP);

-- perfil
INSERT INTO perfil (id_usuario, peso_inicial, peso_final, altura, nivel_atividade, objetivo, tmb, tmt, tmf, meta_proteina, meta_carboidrato, meta_gordura, dt_criacao_perfil, proteina_peso, carboidrato_peso, gordura_peso)
VALUES (1, 70.5, 65.2, 175.0, 'MODERADO', 'GANHO', 2500, 2000, 1500, 120, 200, 70, CURRENT_DATE, 1.5, 3.5, 1.0);
UPDATE perfil
SET 
	peso_inicial = 80.0, peso_final = 75.0, altura = 180.0, nivel_atividade = 'LEVE', objetivo = 'PERDA', tmb = 3000, tmt = 3000, tmf = 3000, 
	meta_proteina = 150, meta_carboidrato = 300, meta_gordura = 100, proteina_peso = 2.0, carboidrato_peso = 3.0, gordura_peso = 2.5
WHERE id_usuario = 1;

-- refeicao
INSERT INTO refeicao (id_usuario, numero_refeicao, nome_refeicao, ativa)
VALUES (1, 1, 'Almoço', true);

-- dia
INSERT INTO dia (id_usuario, data_dia, peso_dia)
VALUES 
    (4, '2024-03-28', 70.5);

-- alimento
INSERT INTO alimento (nome_alimento, estado_alimento, marca_alimento, alimento_verificado, grupo_excludente) 
VALUES 
('Ovo', 'COZIDO', 'Marca X', false, 'ONIVORO');

-- tabela_nutricional
INSERT INTO tabela_nutricional (id_alimento, unidade_medida, qtde_padrao, qtde_proteina, qtde_carboidrato, qtde_gordura, qtde_alcool)
VALUES 
  (1, 'GRAMA', 200, 10, 20, 5, 0);

