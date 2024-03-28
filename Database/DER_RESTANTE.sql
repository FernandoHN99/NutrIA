



 CREATE INDEX PK FK ON  Favorito Alimento (id_usuario, id_alimento);

CREATE TABLE Favorito Alimento (
  id_usuario SERIAL,
  id_alimento SERIAL,
  dt_favorito TIMESTAMP,
  CONSTRAINT FK_Favorito Alimento.id_usuario
    FOREIGN KEY (id_usuario)
      REFERENCES Usuario(id_usuario),
  CONSTRAINT FK_Favorito Alimento.id_alimento
    FOREIGN KEY (id_alimento)
      REFERENCES Alimento(id_alimento)
);




CREATE TABLE Alimento Prato (
  id_prato SERIAL,
  id_alimento SERIAL,
  qtde_medida NUMERIC(3,0),
  qtde_proteina NUMERIC(7,0),
  qtde_gordura NUMERIC(7,0),
  qtde_alcool NUMERIC(7,0),
  qtde_proteina NUMERIC(7,0),
  unidade_medida TEXT,
  dt_favorito TIMESTAMP,
  CONSTRAINT FK_Alimento Prato.id_alimento
    FOREIGN KEY (id_alimento)
      REFERENCES Alimento(id_alimento),
  CONSTRAINT FK_Alimento Prato.id_prato
    FOREIGN KEY (id_prato)
      REFERENCES Prato(id_prato)
);

CREATE INDEX PK FK ON  Alimento Prato (id_prato, id_alimento);

CREATE INDEX NULL ON  Alimento Prato (dt_favorito);



CREATE TABLE Codigo de Barras (
  codigo BYTEA,
  id_alimento SERIAL,
  PRIMARY KEY (codigo),
  CONSTRAINT FK_Codigo de Barras.id_alimento
    FOREIGN KEY (id_alimento)
      REFERENCES Alimento(id_alimento)
);


CREATE TABLE Controle Nutriente (
  id_dia SERIAL,
  id_alimento SERIAL,
  id_refeicao SERIAL,
  id_usuario SERIAL,
  id_prato SERIAL,
  hora_insercao TIME,
  unidade_medida TEXT,
  qtde_medida NUMERIC(3,0),
  qtde_proteina NUMERIC(7,0),
  qtde_gordura NUMERIC(7,0),
  qtde_carboidrato NUMERIC(7,0),
  qtde_alcool NUMERIC(7,0),
  CONSTRAINT FK_Controle Nutriente.id_usuario
    FOREIGN KEY (id_usuario)
      REFERENCES Usuario(id_usuario),
  CONSTRAINT FK_Controle Nutriente.id_refeicao
    FOREIGN KEY (id_refeicao)
      REFERENCES Refeicao(id_refeicao),
  CONSTRAINT FK_Controle Nutriente.id_alimento
    FOREIGN KEY (id_alimento)
      REFERENCES Alimento(id_alimento),
  CONSTRAINT FK_Controle Nutriente.id_dia
    FOREIGN KEY (id_dia)
      REFERENCES Dia(id_dia),
  CONSTRAINT FK_Controle Nutriente.id_prato
    FOREIGN KEY (id_prato)
      REFERENCES Alimento Prato(id_prato)
);

CREATE INDEX FK (NULL) ON  Controle Nutriente (id_prato);
