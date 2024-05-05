import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import Usuario from "./usuario";
import { salvarDiaObject } from "../schemas/dia/salvarDiaSchema";

@Entity('dia')
export default class Dia extends BaseEntity {

   @PrimaryColumn('uuid')
   id_usuario: string;

   @PrimaryColumn('date')
   dt_dia: string;

   @Column('numeric', { precision: 4, scale: 1 })
   peso_dia: number | null;

   @Column('bytea')
   foto_dia: string | null;

   @Column('numeric', { precision: 4, scale: 1 })
   medida_abdomen_dia: number | null;

   @ManyToOne(() => Usuario, (usuario) => usuario.dias)
   @JoinColumn({ name: "id_usuario" })
   usuario: Usuario;

   constructor(dados: salvarDiaObject) {
      super();
      if(dados){
         this.id_usuario = dados.id_usuario;
         this.dt_dia = dados.dt_dia
         this.peso_dia = dados.peso_dia || null;
         this.foto_dia = dados.foto_dia || null;
         this.medida_abdomen_dia = dados.medida_abdomen_dia || null;
      }
   }

   public atualizar(dadosAtualizacao: salvarDiaObject): void {
      this.peso_dia = dadosAtualizacao.peso_dia !== undefined 
         ? dadosAtualizacao.peso_dia 
            : this.peso_dia;
            
      this.foto_dia = dadosAtualizacao.foto_dia !== undefined 
         ? dadosAtualizacao.foto_dia 
            : this.foto_dia;

      this.medida_abdomen_dia = dadosAtualizacao.medida_abdomen_dia !== undefined 
         ? dadosAtualizacao.medida_abdomen_dia 
            : this.medida_abdomen_dia;
  }
  
}