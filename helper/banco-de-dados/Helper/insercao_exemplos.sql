-- Active: 1714012903894@@aws-0-sa-east-1.pooler.supabase.com@5432@postgres
-- usuario
INSERT INTO usuario (id_usuario, nome, sobrenome, dt_nascimento, pais, sexo, sistema_metrico, perfil_alimentar)
VALUES
('id_usuario', 'fe' , 'nando',  '1990-01-01', 'Brasil', 'M', 'METRICO', 'VEGETARIANO');

-- cartao
INSERT INTO cartao (id_usuario, tipo_cartao, dtt_interacao_cartao) 
VALUES 
('c62d6f87-c028-4bd5-963b-73cc3d6b332a', 'CALORIAS', CURRENT_TIMESTAMP);

-- perfil
INSERT INTO perfil (id_usuario, peso_inicial, peso_final, altura, nivel_atividade, objetivo, tmb, tmt, tmf, meta_proteina, meta_carboidrato, meta_gordura, dt_criacao_perfil, proteina_peso, carboidrato_peso, gordura_peso)
VALUES 
('a60fdf7b-c7f4-4778-b022-7c71040290cd', 70.5, 65.2, 175.0, 'MODERADO', 'GANHO', 2500, 2000, 1500, 120, 200, 70, CURRENT_DATE, 1.5, 3.5, 1.0);
UPDATE perfil
SET 
	peso_inicial = 80.0, peso_final = 75.0, altura = 180.0, nivel_atividade = 'LEVE', objetivo = 'PERDA', tmb = 3000, tmt = 3000, tmf = 3000, 
	meta_proteina = 150, meta_carboidrato = 300, meta_gordura = 100, proteina_peso = 2.0, carboidrato_peso = 3.0, gordura_peso = 2.5
WHERE id_usuario = 'a60fdf7b-c7f4-4778-b022-7c71040290cd';

-- refeicao
INSERT INTO refeicao (id_usuario, numero_refeicao, nome_refeicao, ativa, dt_criacao)
VALUES
('a60fdf7b-c7f4-4778-b022-7c71040290cd', 1, 'Cafe', true, CURRENT_DATE);

INSERT INTO refeicao (id_usuario, numero_refeicao, nome_refeicao, ativa, dt_criacao)
VALUES
('fd4fa7b5-68dd-4754-981f-90565beb14d6', 2, 'Almoco', true, CURRENT_DATE);

INSERT INTO refeicao (id_usuario, numero_refeicao, nome_refeicao, ativa, dt_criacao)
VALUES
('fd4fa7b5-68dd-4754-981f-90565beb14d6', 3, 'Janta', true, CURRENT_DATE);

-- dia
INSERT INTO dia (id_usuario, dt_dia, peso_dia)
VALUES 
('a60fdf7b-c7f4-4778-b022-7c71040290cd', CURRENT_DATE, 70.5);

INSERT INTO dia (id_usuario, dt_dia, peso_dia)
VALUES 
('a60fdf7b-c7f4-4778-b022-7c71040290cd', CURRENT_DATE-1, 70.5);


-- alimento
INSERT INTO alimento (id_usuario, nome_alimento, estado_alimento, marca_alimento, alimento_verificado, grupo_excludente) 
VALUES 
(NULL, 'Bvo', 'COZIDO', 'Marca X', false, 'ONIVORO');

INSERT INTO alimento (id_alimento, nome_alimento, estado_alimento, marca_alimento, alimento_verificado, grupo_excludente) 
VALUES 
(2, 'Carne', 'COZIDO', 'Marca X', false, 'ONIVORO');

-- tabela_nutricional
INSERT INTO tabela_nutricional (id_alimento, unidade_medida, porcao_padrao, qtde_proteina, qtde_carboidrato, qtde_gordura, qtde_alcool)
VALUES 
(1, 'GRAMA', 200, 10, 20, 5, 0);

-- codigo_de_barras
INSERT INTO codigo_de_barras(codigo, id_alimento)
VALUES 
('010101010101', 1);

INSERT INTO codigo_de_barras(codigo, id_alimento)
VALUES 
('01010101010123', 2);

-- alimento_favoritado
INSERT INTO alimento_favoritado (id_usuario, id_alimento, dtt_alimento_favoritado)
VALUES 
('a60fdf7b-c7f4-4778-b022-7c71040290cd', 1, CURRENT_TIMESTAMP);

-- prato
INSERT INTO prato (id_prato, id_usuario, nome_prato, dtt_criacao_prato, dtt_prato_favoritado)
VALUES 
(1, 'a60fdf7b-c7f4-4778-b022-7c71040290cd', 'ARROZ-FEIJAO-CARNE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO prato (id_prato, id_usuario, nome_prato, dtt_criacao_prato, dtt_prato_favoritado)
VALUES 
(2, 'a60fdf7b-c7f4-4778-b022-7c71040290cd', 'ARROZ-FEIJAO-FRANGO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- alimento_prato
INSERT INTO alimento_prato (id_prato, id_alimento, unidade_medida, porcao_padrao, qtde_utilizada, qtde_proteina, qtde_gordura, qtde_carboidrato, qtde_alcool, dtt_favorito)
VALUES 
(1, 1, 'GRAMA', 100, 50, 10, 5, 20, 0, CURRENT_TIMESTAMP);

INSERT INTO alimento_prato (id_prato, id_alimento, unidade_medida, porcao_padrao, qtde_utilizada, qtde_proteina, qtde_gordura, qtde_carboidrato, qtde_alcool, dtt_favorito)
VALUES 
(2, 1, 'GRAMA', 100, 50, 10, 5, 20, 0, CURRENT_TIMESTAMP);


-- alimento_consumido
INSERT INTO alimento_consumido (id_usuario, numero_refeicao, id_alimento, id_prato, dt_insercao, hr_insercao, unidade_medida, porcao_padrao, qtde_utilizada, qtde_proteina, qtde_gordura, qtde_carboidrato, qtde_alcool)
VALUES
('a60fdf7b-c7f4-4778-b022-7c71040290cd', 1, 1, 1, CURRENT_DATE, CURRENT_TIME, 'GRAMA', 100, 50, 10, 5, 20, 0);

INSERT INTO alimento_consumido (id_usuario, numero_refeicao, id_alimento, id_prato, dt_insercao, hr_insercao, unidade_medida, porcao_padrao, qtde_utilizada, qtde_proteina, qtde_gordura, qtde_carboidrato, qtde_alcool)
VALUES
('a60fdf7b-c7f4-4778-b022-7c71040290cd', 1, 1, 1, CURRENT_DATE, CURRENT_TIME, 'GRAMA', 100, 50, 10, 5, 20, 0);

INSERT INTO alimento_consumido (id_usuario, numero_refeicao, id_alimento, id_prato, dt_insercao, hr_insercao, unidade_medida, porcao_padrao, qtde_utilizada, qtde_proteina, qtde_gordura, qtde_carboidrato, qtde_alcool)
VALUES
('a60fdf7b-c7f4-4778-b022-7c71040290cd', 1, 1, 2, CURRENT_DATE-1, CURRENT_TIME, 'GRAMA', 100, 50, 10, 5, 20, 0);
