DROP TABLE IF EXISTS usuario CASCADE;
CREATE TABLE usuario (
	id_usuario uuid,
   nome TEXT NOT NULL,
   sobrenome TEXT NOT NULL,
	dt_nascimento DATE NOT NULL,
	pais TEXT NOT NULL,
	sexo TEXT NOT NULL,
	sistema_metrico VARCHAR(10) NOT NULL,
	perfil_alimentar VARCHAR(20) NOT NULL,
	CONSTRAINT check_perfil_sexo CHECK (sexo IN ('H', 'M')),
	CONSTRAINT check_sistema_metrico CHECK (sistema_metrico IN ('METRICO', 'IMPERIAL')), 
	CONSTRAINT check_perfil_alimentar CHECK (perfil_alimentar IN ('ONIVORO', 'VEGETARIANO', 'VEGANO')),
   CONSTRAINT usuario_fk_auth_user FOREIGN KEY (id_usuario) REFERENCES auth.users(id) ON DELETE CASCADE,
	PRIMARY KEY (id_usuario)
);