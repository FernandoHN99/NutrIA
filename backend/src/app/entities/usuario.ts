import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany, JoinColumn, AfterInsert} from "typeorm";
import Cartao from "./cartao";
import Dia from "./dia";
import Refeicao from "./refeicao";
import Alimento from "./alimento";
import AlimentoConsumido from "./alimentoConsumido";
import AlimentoFavorito from "./alimentoFavorito";
import Prato from "./prato";
import Perfil from "./perfil";
import { atualizarUsuarioDadosObject } from "../schemas/usuario/atualizarUsuarioDadosSchema";
import { criarUsuarioObject } from "../schemas/usuario/criarUsuarioSchema";

@Entity('usuario')
export default class Usuario extends BaseEntity {

   @PrimaryColumn('uuid')
   id_usuario: string;

   @Column('date')
   dt_nascimento: string;

   @Column('text')
   nome: string;

   @Column('text')
   sobrenome: string;

   @Column('text')
   pais: string;

   @Column('text')
   sexo: string;

   @Column('varchar', { length: 10 })
   sistema_metrico: string;

   @Column('varchar', { length: 20 })
   perfil_alimentar: string;

   @OneToMany(() => Cartao, (cartao) => cartao.usuario)
   @JoinColumn({ name: 'id_usuario' })
   cartoes: Cartao[]

   @OneToMany(() => Dia, (dia) => dia.usuario)
   @JoinColumn({ name: 'id_usuario' })
   dias: Dia[]

   @OneToMany(() => Refeicao, (refeicao) => refeicao.usuario)
   @JoinColumn({ name: 'id_usuario' })
   refeicoes: Refeicao[]

   @OneToMany(() => Alimento, (alimento) => alimento.usuario)
   @JoinColumn({ name: 'id_usuario' })
   alimentos: Alimento[]

   @OneToMany(() => AlimentoConsumido, (alimentoConsumido) => alimentoConsumido.usuario)
   @JoinColumn({ name: 'id_usuario' })
   alimentosConsumidos: AlimentoConsumido[]

   @OneToMany(() => AlimentoFavorito, (alimentoFavorito) => alimentoFavorito.usuario)
   @JoinColumn({ name: 'id_usuario' })
   alimentosFavoritos: AlimentoFavorito[]

   @OneToMany(() => Prato, (prato) => prato.usuario)
   @JoinColumn({ name: 'id_usuario' })
   pratos: Prato[]

   @OneToMany(() => Perfil, (perfil) => perfil.usuario)
   @JoinColumn({ name: 'id_usuario' })
   perfis: Perfil[]

   constructor(dadosCriarUsuario: criarUsuarioObject) {
      super();
      if(dadosCriarUsuario){
         Object.assign(this, dadosCriarUsuario);
      }
   }
   
   public atualizarDados(dadosAtualizacao: atualizarUsuarioDadosObject) {
      Object.assign(this, dadosAtualizacao);
   }

}