import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import Usuario from "./usuario";
import Util from "../../utils/util";


@Entity('alimento')
export default class Alimento extends BaseEntity {

   @PrimaryColumn('int4')
   id_alimento: number;

   @Column('uuid')
   id_usuario: string;

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
   
   @Column('timestamp')
   dtt_criacao_alimento: string;
   
   @ManyToOne(() => Usuario, (usuario) => usuario.alimentos)
   @JoinColumn({ name: "id_usuario" })
   usuario: Usuario;

   constructor() {
      super();
   }

   public atualizar(dadosAtualizacao: any): void {
  }
  
}