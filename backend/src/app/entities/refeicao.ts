import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import Usuario from "./usuario";
import Util from "../../utils/util";
import AlimentoConsumido from "./alimentoConsumido";
import { atualizarRefeicaoObject } from "../schemas/refeicao/atualizarRefeicaoSchema";
import { criarRefeicaoObject } from "../schemas/refeicao/criarRefeicaoSchema";


@Entity('refeicao')
export default class Refeicao extends BaseEntity {

   @PrimaryColumn('uuid')
   id_usuario: string;

   @PrimaryColumn('smallint')
   numero_refeicao: number;

   @Column('text')
   nome_refeicao: string;

   @Column('boolean')
   ativa: boolean;

   @Column('date')
   dt_criacao: string;

   @ManyToOne(() => Usuario, (usuario) => usuario.refeicoes)
   @JoinColumn({ name: "id_usuario" })
   usuario: Usuario;

   @OneToMany(() => AlimentoConsumido, alimentoConsumido => alimentoConsumido.refeicao)
   @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id_usuario' })
   @JoinColumn({ name: 'numero_refeicao', referencedColumnName: 'numero_refeicao' })
   alimentosConsumidos: AlimentoConsumido[];

   constructor(dadosCriacao: criarRefeicaoObject) {
      super();
      if(dadosCriacao){
         Object.assign(this, dadosCriacao);
      }
   }

   public atualizar(dadosAtualizacao: atualizarRefeicaoObject) {
      Object.assign(this, dadosAtualizacao);
  }
  
}