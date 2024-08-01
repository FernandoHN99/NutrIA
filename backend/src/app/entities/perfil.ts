import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Check, Unique } from "typeorm";
import Usuario from "./usuario";

@Entity('perfil')
@Check(`proteina_peso >= 0 AND carboidrato_peso >= 0 AND gordura_peso >= 0 AND meta_proteina >= 0 AND meta_carboidrato >= 0 AND meta_gordura >= 0 AND tmt > 0 AND tmf > 0 AND tmb > 0`)
@Check(`nivel_atividade IN ('SENDENTARIO', 'LEVE', 'MODERADO', 'INTENSO', 'EXTREMO')`)
@Check(`objetivo IN ('PERDA', 'MANUTENCAO', 'GANHO')`)
@Unique(['id_usuario', 'dt_criacao_perfil'])
export default class Perfil extends BaseEntity {

   @PrimaryGeneratedColumn()
   id_perfil: number;

   @Column({ type: 'uuid' })
   id_usuario: string;

   @Column({ type: 'numeric', precision: 4, scale: 1 })
   peso_inicial: number;

   @Column({ type: 'numeric', precision: 4, scale: 1 })
   peso_final: number;

   @Column({ type: 'numeric', precision: 4, scale: 1 })
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

   @Column({ type: 'numeric', precision: 3, scale: 1 })
   proteina_peso: number;

   @Column({ type: 'numeric', precision: 3, scale: 1 })
   carboidrato_peso: number;

   @Column({ type: 'numeric', precision: 3, scale: 1 })
   gordura_peso: number;

   @Column({ type: 'date' })
   dt_criacao_perfil: Date;

   @ManyToOne(() => Usuario, usuario => usuario.perfis)
   @JoinColumn({ name: 'id_usuario' })
   usuario: Usuario;

   constructor(dadosCriacao?: Partial<Perfil>) {
      super();
      if (dadosCriacao) {
         Object.assign(this, dadosCriacao);
      }
   }
}
