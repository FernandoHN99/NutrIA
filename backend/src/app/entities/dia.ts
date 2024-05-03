import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import Usuario from "./usuario";

@Entity('dia')
export default class Dia extends BaseEntity {

   @PrimaryColumn('uuid')
   id_usuario: string;

   @PrimaryColumn('date')
   dt_dia: string;

   @Column('numeric', { precision: 4, scale: 1 })
   peso_dia: number;

   @Column('bytea')
   foto_dia: Buffer;

   @Column('numeric', { precision: 4, scale: 1 })
   medida_abdomen_dia: number;

   @ManyToOne(() => Usuario, (usuario) => usuario.dias)
   @JoinColumn({ name: "id_usuario" })
   usuario: Usuario;

   constructor(id_usuario: string, peso_dia: number, foto_dia: Buffer, medida_abdomen_dia: number) {
      super();
      this.id_usuario = id_usuario;
      this.dt_dia = new Date().toISOString().split('T')[0];
      this.peso_dia = peso_dia;
      this.foto_dia = foto_dia;
      this.medida_abdomen_dia = medida_abdomen_dia;
   }

}