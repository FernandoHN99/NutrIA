-- Active: 1714012903894@@aws-0-sa-east-1.pooler.supabase.com@5432@postgres
CREATE OR REPLACE FUNCTION criar_cartao_usuario()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO cartao (id_usuario, tipo_cartao, dtt_interacao_cartao)
    VALUES 
        (NEW.id_usuario, 'DIETA FLEXIVEL', NULL),
        (NEW.id_usuario, 'MACROS', NULL),
        (NEW.id_usuario, 'CALORIAS', NULL);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_criar_cartao_usuario 
AFTER INSERT ON usuario 
FOR EACH ROW 
EXECUTE FUNCTION criar_cartao_usuario();
