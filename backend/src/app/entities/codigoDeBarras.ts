import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany, OneToOne} from "typeorm";
import Alimento from "./alimento";

@Entity('codigo_de_barras')
export default class CodigoDeBarras extends BaseEntity {

   @PrimaryColumn('text')
   codigo: string;

   @Column('int4')
   id_alimento: number;

   @ManyToOne(() => Alimento, (alimento) => alimento.codigosDeBarras)
   @JoinColumn({ name: "id_alimento" })
   alimento: Alimento;

}

