import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany, JoinColumn, AfterInsert} from "typeorm";
import Cartao from "./cartao";
import { atualizarUsuarioDadosObject } from "../schemas/usuario/atualizarUsuarioDadosSchema";

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

   public atribuirDados(dadosUsuario: any) {
      this.id_usuario = dadosUsuario.id_usuario;
      this.dt_nascimento = dadosUsuario.dt_nascimento;
      this.nome = dadosUsuario.nome;
      this.sobrenome = dadosUsuario.sobrenome;
      this.pais = dadosUsuario.pais;
      this.sexo = dadosUsuario.sexo;
      this.sistema_metrico = dadosUsuario.sistema_metrico;
      this.perfil_alimentar = dadosUsuario.perfil_alimentar;
   }

   public atualizar(novosDados: atualizarUsuarioDadosObject) {
      this.dt_nascimento = novosDados.dt_nascimento || this.dt_nascimento;
      this.nome = novosDados.nome || this.nome;
      this.sobrenome = novosDados.sobrenome || this.sobrenome;
      this.pais = novosDados.pais || this.pais;
      this.sexo = novosDados.sexo || this.sexo;
      this.sistema_metrico = novosDados.sistema_metrico || this.sistema_metrico;
      this.perfil_alimentar = novosDados.perfil_alimentar || this.perfil_alimentar;
   }

}