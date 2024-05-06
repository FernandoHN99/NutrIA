import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import Usuario from "./usuario";
import Util from "../../utils/util";

// CREATE TABLE alimento (
// 	id_alimento SERIAL,
// 	nome_alimento TEXT NOT NULL,
// 	estado_alimento VARCHAR(20) NOT NULL,
// 	alimento_verificado BOOLEAN NOT NULL,
// 	grupo_excludente VARCHAR(25) NOT NULL,
// 	marca_alimento TEXT,
// 	CONSTRAINT check_grupo_excludente CHECK (
// 		grupo_excludente IN (
// 			'ONIVORO', 'VEGETARIANO', 'VEGANO')
// 	), 
// 	CONSTRAINT check_estado_alimento CHECK (
// 		estado_alimento IN (
// 			'CRU', 'COZIDO', 'ASSADO', 'FRITO', 'GRELHADO', 'PADRAO')
// 	), 
// 	PRIMARY KEY (id_alimento)
// );

@Entity('alimento')
export default class Alimento extends BaseEntity {

   @PrimaryColumn('int4')
   id_alimento: number;

   @Column('text')
   nome_alimento: string;

   @Column('varchar', { length: 20 })
   estado_alimento: string;

   @Column('boolean')
   alimento_verificado: boolean;

   @Column('varchar', { length: 25 })
   grupo_excludente: string;

   @Column('text')
   marca_alimento: string;
   
   @ManyToOne(() => Usuario, (usuario) => usuario.alimentos)
   @JoinColumn({ name: "id_usuario" })
   usuario: Usuario;

   constructor() {
      super();
   }

   public atualizar(dadosAtualizacao: any): void {
  }
  
}