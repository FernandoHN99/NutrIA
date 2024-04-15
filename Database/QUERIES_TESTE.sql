SELECT * FROM usuario;

SELECT * FROM cartao;

SELECT * FROM perfil;

SELECT * FROM refeicao;

SELECT * FROM dia;

SELECT * FROM alimento;

SELECT * FROM tabela_nutricional;

SELECT * FROM codigo_de_barras;

SELECT * FROM alimento_favoritado;

SELECT * FROM prato;

SELECT * FROM alimento_prato;

SELECT * FROM alimento_consumido;

------------------------------

SELECT ac.dt_insercao, r.nome_refeicao, a.nome_alimento, ac.unidade_medida, ac.porcao_padrao, ac.qtde_utilizada, ac.qtde_proteina, ac.qtde_carboidrato, ac.qtde_gordura, ac.qtde_alcool
FROM
    alimento_consumido ac
    JOIN alimento a ON ac.id_alimento = a.id_alimento
    JOIN refeicao r ON r.numero_refeicao = ac.numero_refeicao AND r.id_usuario = ac.id_usuario
WHERE
    ac.id_usuario = 1
ORDER BY ac.dt_insercao ASC, r.numero_refeicao ASC;

SELECT
    ac.dt_insercao,
    r.nome_refeicao,
    sum(ac.qtde_proteina) AS proteinas,
    sum(ac.qtde_carboidrato) AS carboidratos,
    sum(ac.qtde_gordura) AS gorduras,
    sum(ac.qtde_alcool) AS alcool
FROM
    alimento_consumido ac
    JOIN refeicao r ON r.numero_refeicao = ac.numero_refeicao AND r.id_usuario = ac.id_usuario
WHERE
    ac.id_usuario = 1
GROUP BY
    ac.dt_insercao,
    r.nome_refeicao
ORDER BY ac.dt_insercao ASC;