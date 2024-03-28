SELECT conname AS constraint_name,
       pg_get_constraintdef(c.oid) AS constraint_definition
FROM pg_constraint c
JOIN pg_namespace n ON n.oid = c.connamespace
JOIN pg_class t ON t.oid = c.conrelid
WHERE n.nspname = 'public' -- Substitua '' pelo esquema desejado
  AND t.relname = 'perfil'; -- Substitua 'nome_da_tabela' pelo nome da tabela desejada


TRUNCATE TABLE usuario CASCADE;

DELETE FROM usuario
WHERE id_usuario = 2;
