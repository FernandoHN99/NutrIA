import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import Usuario from "./usuario";
import Util from "../../utils/util";
import AlimentoConsumido from "./alimentoConsumido";
import { atualizarRefeicaoObject } from "../schemas/refeicao/atualizarRefeicaoSchema";


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

   constructor(id_usuario: string, nome_refeicao: string, numero_refeicao: number) {
      super();
         this.id_usuario = id_usuario;
         this.numero_refeicao = numero_refeicao;
         this.nome_refeicao = nome_refeicao;
         this.ativa = true;
         this.dt_criacao = Util.criarStrData();
   }

   public atualizar(dadosAtualizacao: atualizarRefeicaoObject): void {
      this.nome_refeicao =  dadosAtualizacao.nome_refeicao !== undefined 
         ? dadosAtualizacao.nome_refeicao 
            : this.nome_refeicao;
      this.ativa = dadosAtualizacao.ativa !== undefined 
         ? dadosAtualizacao.ativa 
            : this.ativa;
  }
  
}