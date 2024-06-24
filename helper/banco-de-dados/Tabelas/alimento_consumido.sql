DROP TABLE IF EXISTS alimento_consumido CASCADE;
CREATE TABLE alimento_consumido (
   id_alimento_consumido BIGSERIAL,
   id_usuario UUID NOT NULL,
	numero_refeicao INTEGER NOT NULL, 
	id_alimento INTEGER NOT NULL,
	id_prato INTEGER,
	dt_dia DATE NOT NULL,
	unidade_medida TEXT NOT NULL,
	porcao_padrao INTEGER,
	qtde_utilizada NUMERIC(5,1) NOT NULL,
	qtde_proteina NUMERIC(5,1) NOT NULL,
	qtde_carboidrato NUMERIC(5,1) NOT NULL,
	qtde_gordura NUMERIC(5,1) NOT NULL,
	qtde_alcool NUMERIC(5,1) NOT NULL,
	kcal NUMERIC(5,1) NOT NULL,
	CONSTRAINT alimento_consumido_check_valores_maiores_que_zero CHECK (
      porcao_padrao > 0 AND qtde_proteina >= 0 AND 
	   qtde_carboidrato >= 0 AND qtde_gordura >= 0 AND qtde_alcool >= 0 AND kcal > 0 AND qtde_utilizada > 0 
	),
	CONSTRAINT alimento_consumido_fk_id_usuario_numero_refeicao FOREIGN KEY (id_usuario, numero_refeicao) REFERENCES refeicao(id_usuario, numero_refeicao),
	CONSTRAINT alimento_consumido_fk_id_alimento FOREIGN KEY (id_alimento) REFERENCES alimento(id_alimento),
	CONSTRAINT alimento_consumido_fk_id_prato FOREIGN KEY (id_prato) REFERENCES prato(id_prato),
   PRIMARY KEY (id_alimento_consumido)
);


INSERT INTO alimento_consumido (id_usuario, numero_refeicao, id_alimento, id_prato, dt_dia, unidade_medida, porcao_padrao, qtde_utilizada, qtde_proteina, qtde_gordura, qtde_carboidrato, qtde_alcool)
VALUES
('fd4fa7b5-68dd-4754-981f-90565beb14d6', 12, 2, NULL, '2024-04-12', 'GRAMA', 100, 50, 10, 5, 20, 0);

SELECT ac.dt_dia,  
   r.nome_refeicao, 
   a.nome_alimento, 
   ac.unidade_medida, 
   ac.porcao_padrao, 
   ac.qtde_utilizada, 
   ac.qtde_proteina, 
   ac.qtde_carboidrato, 
   ac.qtde_gordura, 
   ac.qtde_alcool
FROM
    alimento_consumido ac
JOIN alimento a 
   ON ac.id_alimento = a.id_alimento
JOIN refeicao r 
   ON r.numero_refeicao = ac.numero_refeicao 
   AND r.id_usuario = ac.id_usuario
WHERE
    ac.id_usuario = 'fd4fa7b5-68dd-4754-981f-90565beb14d6'
    AND ac.dt_dia >= '2024-04-12'
    AND ac.dt_dia <= '2025-04-12'
ORDER BY ac.dt_dia ASC, r.numero_refeicao ASC;


SELECT 
    ac.dt_insercao, 
    r.nome_refeicao, 
    json_agg(
        json_build_object(
            'nome_alimento', a.nome_alimento,
            'unidade_medida', ac.unidade_medida,
            'porcao_padrao', ac.porcao_padrao,
            'qtde_utilizada', ac.qtde_utilizada,
            'qtde_proteina', ac.qtde_proteina,
            'qtde_carboidrato', ac.qtde_carboidrato,
            'qtde_gordura', ac.qtde_gordura,
            'qtde_alcool', ac.qtde_alcool
        )
    ) AS alimentos_consumidos
FROM 
    alimento_consumido ac
JOIN 
    alimento a ON ac.id_alimento = a.id_alimento
JOIN 
    refeicao r ON r.numero_refeicao = ac.numero_refeicao 
    AND r.id_usuario = ac.id_usuario
WHERE 
    ac.id_usuario = 'fd4fa7b5-68dd-4754-981f-90565beb14d6'
GROUP BY 
    ac.dt_insercao, r.nome_refeicao
ORDER BY 
    ac.dt_insercao ASC, r.nome_refeicao ASC;