import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import Usuario from "./usuario";
import { salvarDiaObject } from "../schemas/dia/salvarDiaSchema";
import Util from "../../utils/util";

@Entity('dia')
export default class Dia extends BaseEntity {

   @PrimaryColumn('uuid')
   id_usuario: string;

   @PrimaryColumn('date')
   dt_dia: string;

   @Column('numeric', { precision: 4, scale: 1, transformer: Util.transformerStringNumber })
   peso_dia: number | null;

   @Column('bytea', { transformer: Util.transformerByteaString })
   foto_dia: string | null;

   @Column('numeric', { precision: 4, scale: 1, transformer: Util.transformerStringNumber})
   medida_abdomen_dia: number | null;

   @ManyToOne(() => Usuario, (usuario) => usuario.dias)
   @JoinColumn({ name: "id_usuario" })
   usuario: Usuario;

   constructor(dadosCriacaoDia: salvarDiaObject) {
      super();
      if(dadosCriacaoDia){
         this.id_usuario = dadosCriacaoDia.id_usuario;
         this.dt_dia = dadosCriacaoDia.dt_dia;
         this.peso_dia = dadosCriacaoDia.peso_dia || null;
         this.foto_dia = dadosCriacaoDia.foto_dia || null;
         this.medida_abdomen_dia = dadosCriacaoDia.medida_abdomen_dia || null;
      }
   }

  public ehValido(): boolean {
      return (this.peso_dia != null || this.foto_dia != null || this.medida_abdomen_dia != null); 
  }
  
}