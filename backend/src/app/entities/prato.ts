import { Entity, Column, BaseEntity, OneToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn} from "typeorm";
import Usuario from "./usuario";
import AlimentoPrato from "./alimentoPrato";
import { criarPratoObject } from "../schemas/prato/criarPratoSchema";
import { atualizarPratoObject } from "../schemas/prato/atualizarPratoSchema";

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

   @OneToMany(() => AlimentoPrato, (alimentoPrato) => alimentoPrato.prato)
   @JoinColumn({ name: 'id_prato' })
   alimentosPrato: AlimentoPrato[];

   constructor(dadosCriacao: criarPratoObject) {
      super();
      if(dadosCriacao){
         Object.assign(this, dadosCriacao);
      }
   }

   public atualizarDados(dadosAtualizacao: atualizarPratoObject) {
      Object.assign(this, dadosAtualizacao);
   }
}