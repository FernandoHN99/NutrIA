import { Entity, Column, PrimaryColumn, BaseEntity, OneToMany, JoinColumn, AfterInsert} from "typeorm";
import Cartao from "./cartao";
import Dia from "./dia";
import Refeicao from "./refeicao";
import Alimento from "./alimento";
import AlimentoConsumido from "./alimentoConsumido";
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

   constructor(id_usuario: string, dt_nascimento: string, nome: string, sobrenome: string, 
         pais: string, sexo: string, sistema_metrico: string, perfil_alimentar: string) {
      super();
      this.id_usuario = id_usuario;
      this.dt_nascimento = dt_nascimento;
      this.nome = nome;
      this.sobrenome = sobrenome;
      this.pais = pais;
      this.sexo = sexo;
      this.sistema_metrico = sistema_metrico;
      this.perfil_alimentar = perfil_alimentar;
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