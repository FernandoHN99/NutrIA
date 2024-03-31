-- usuario
INSERT INTO usuario (email, senha, dt_nascimento, dtt_conta_criacao, pais, sexo, sistema_metrico, perfil_alimentar)
VALUES
('example01@example.com', 'password123', '1990-01-01', CURRENT_TIMESTAMP, 'Brazil', 'Male', 'METRICO', 'VEGETARIANO');
INSERT INTO usuario (email, senha, dt_nascimento, dtt_conta_criacao, pais, sexo, sistema_metrico, perfil_alimentar)
VALUES
('example02@example.com', 'password123', '1990-01-01', CURRENT_TIMESTAMP, 'Brazil', 'Male', 'METRICO', 'VEGANO');

-- cartao
INSERT INTO cartao (id_usuario, tipo_cartao, dtt_interacao_cartao) 
VALUES 
(1, 'MACROS', CURRENT_TIMESTAMP);

-- perfil
INSERT INTO perfil (id_usuario, peso_inicial, peso_final, altura, nivel_atividade, objetivo, tmb, tmt, tmf, meta_proteina, meta_carboidrato, meta_gordura, dt_criacao_perfil, proteina_peso, carboidrato_peso, gordura_peso)
VALUES 
(1, 70.5, 65.2, 175.0, 'MODERADO', 'GANHO', 2500, 2000, 1500, 120, 200, 70, CURRENT_DATE, 1.5, 3.5, 1.0);
UPDATE perfil
SET 
	peso_inicial = 80.0, peso_final = 75.0, altura = 180.0, nivel_atividade = 'LEVE', objetivo = 'PERDA', tmb = 3000, tmt = 3000, tmf = 3000, 
	meta_proteina = 150, meta_carboidrato = 300, meta_gordura = 100, proteina_peso = 2.0, carboidrato_peso = 3.0, gordura_peso = 2.5
WHERE id_usuario = 1;

-- refeicao
INSERT INTO refeicao (id_usuario, numero_refeicao, nome_refeicao, ativa)
VALUES
(1, 1, 'Almoço', true);

-- dia
INSERT INTO dia (id_usuario, dt_dia, peso_dia)
VALUES 
(1, CURRENT_DATE, 70.5);

-- alimento
INSERT INTO alimento (nome_alimento, estado_alimento, marca_alimento, alimento_verificado, grupo_excludente) 
VALUES 
('Ovo', 'COZIDO', 'Marca X', false, 'ONIVORO');

-- tabela_nutricional
INSERT INTO tabela_nutricional (id_alimento, unidade_medida, porcao_padrao, qtde_proteina, qtde_carboidrato, qtde_gordura, qtde_alcool)
VALUES 
(1, 'GRAMA', 200, 10, 20, 5, 0);

-- codigo_de_barras
INSERT INTO codigo_de_barras(codigo, id_alimento)
VALUES 
('010101010101', 1);

-- alimento_favoritado
INSERT INTO alimento_favoritado (id_usuario, id_alimento, dtt_alimento_favoritado)
VALUES 
(1, 1, CURRENT_TIMESTAMP);

-- prato
INSERT INTO prato (id_usuario, nome_prato, dtt_criacao_prato, dtt_prato_favoritado)
VALUES 
(1, 'ARROZ-FEIJAO-CARNE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- alimento_prato
INSERT INTO alimento_prato (id_prato, id_alimento, unidade_medida, porcao_padrao, qtde_utilizada, qtde_proteina, qtde_gordura, qtde_carboidrato, qtde_alcool, dtt_favorito)
VALUES 
(1, 1, 'GRAMA', 100, 50, 10, 5, 20, 0, CURRENT_TIMESTAMP);

-- alimento_consumido
INSERT INTO alimento_consumido (id_dia, id_refeicao, id_alimento, hora_insercao, unidade_medida, porcao_padrao, qtde_utilizada, qtde_proteina, qtde_gordura, qtde_carboidrato, qtde_alcool)
VALUES
(1, 1, 1, CURRENT_TIME, 'GRAMA', 100, 50, 10, 5, 20, 0);


