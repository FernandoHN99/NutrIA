import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Check, Unique } from "typeorm";
import { criarPerfilObject } from "../schemas/perfil/criarPerfilSchema";
import { atualizarPerfilObject } from "../schemas/perfil/atualizarPerfilSchema";
import Usuario from "./usuario";
import Util from "../../utils/util";

@Entity('perfil')
export default class Perfil extends BaseEntity {

   @PrimaryGeneratedColumn()
   id_perfil: number;

   @Column({ type: 'uuid' })
   id_usuario: string;

   @Column({ type: 'numeric', precision: 4, scale: 1, transformer: Util.transformerStringNumber })
   peso_inicial: number;

   @Column({ type: 'numeric', precision: 4, scale: 1, transformer: Util.transformerStringNumber })
   peso_final: number;

   @Column({ type: 'numeric', precision: 4, scale: 1, transformer: Util.transformerStringNumber })
   altura: number;

   @Column({ type: 'varchar', length: 15 })
   nivel_atividade: string;

   @Column({ type: 'varchar', length: 15 })
   objetivo: string;

   @Column({ type: 'int' })
   tmb: number;

   @Column({ type: 'int' })
   tmt: number;

   @Column({ type: 'int' })
   tmf: number;

   @Column({ type: 'int' })
   meta_proteina: number;

   @Column({ type: 'int' })
   meta_carboidrato: number;

   @Column({ type: 'int' })
   meta_gordura: number;

   @Column({ type: 'numeric', precision: 3, scale: 1, transformer: Util.transformerStringNumber })
   proteina_peso: number;

   @Column({ type: 'numeric', precision: 3, scale: 1, transformer: Util.transformerStringNumber })
   carboidrato_peso: number;

   @Column({ type: 'numeric', precision: 3, scale: 1, transformer: Util.transformerStringNumber })
   gordura_peso: number;

   @Column({ type: 'date' })
   dt_criacao_perfil: Date;

   @ManyToOne(() => Usuario, usuario => usuario.perfis)
   @JoinColumn({ name: 'id_usuario' })
   usuario: Usuario;

   constructor(dadosCriacao: criarPerfilObject) {
      super();
      if(dadosCriacao){
         Object.assign(this, dadosCriacao);
      }
   }

   public atualizarDados(dadosAtualizacao: criarPerfilObject | atualizarPerfilObject) {
      Object.assign(this, dadosAtualizacao);
   }
}
