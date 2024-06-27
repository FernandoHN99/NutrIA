import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import Alimento from "./alimento";
import Util from "../../utils/util";

@Entity('codigo_de_barras')
export default class CodigoDeBarras extends BaseEntity {

   @Column('text')
   codigo: string;

   @PrimaryColumn('int4')
   id_alimento: number;

   @OneToMany(() => Alimento, (alimento) => alimento.codigoDeBarras)
   @JoinColumn({ name: "id_alimento" })
   alimentos: Alimento[];
  
}