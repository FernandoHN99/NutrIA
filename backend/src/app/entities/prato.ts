import { Entity, Column, BaseEntity, ManyToOne, JoinColumn, PrimaryGeneratedColumn} from "typeorm";
import Usuario from "./usuario";
import { criarPratoObject } from "../schemas/prato/criarPratoSchema";

@Entity('prato')
export default class Prato extends BaseEntity {

   @PrimaryGeneratedColumn()
   id_prato: number;

   @Column('uuid')
   id_usuario: string;

   @Column('text')
   nome_prato: string;

   @Column('timestamp')
   dtt_criacao_prato: string;

   @Column('boolean')
   prato_favoritado: string;
   
   @ManyToOne(() => Usuario, (usuario) => usuario.pratos)
   @JoinColumn({ name: 'id_usuario' })
   usuario: Usuario;

   constructor(dadosCriacao: criarPratoObject) {
      super();
      if(dadosCriacao){
         Object.assign(this, dadosCriacao);
      }
   }
}