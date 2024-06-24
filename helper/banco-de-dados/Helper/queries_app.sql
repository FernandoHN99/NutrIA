-- ajuste a query abaixo para agrupargroup by dia

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
    ac.id_usuario = 'fd4fa7b5-68dd-4754-981f-90565beb14d6'
GROUP BY
    ac.dt_insercao,
    r.nome_refeicao
ORDER BY ac.dt_insercao ASC;

