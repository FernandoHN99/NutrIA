DROP TABLE IF EXISTS dia CASCADE;
CREATE TABLE dia (
	id_usuario UUID,
	dt_dia DATE,
	peso_dia NUMERIC(4,1),
	foto_dia BYTEA,
	medida_abdomen_dia NUMERIC(4,1),
	CONSTRAINT dia_fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
	PRIMARY KEY (id_usuario, dt_dia)
);