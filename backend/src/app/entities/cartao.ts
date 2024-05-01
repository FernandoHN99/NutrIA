import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import Usuario from "./usuario";

@Entity('cartao')
export default class Cartao extends BaseEntity {

   @PrimaryColumn('uuid')
   id_usuario: string

   @PrimaryColumn('text')
   tipo_cartao: string

   @Column('timestamp')
   dtt_interacao_cartao: string

   @ManyToOne(() => Usuario, (usuario) => usuario.cartoes)
   @JoinColumn({ name: "id_usuario" })
   usuario: Usuario;

}