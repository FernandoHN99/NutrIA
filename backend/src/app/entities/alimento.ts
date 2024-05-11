import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import Usuario from "./usuario";
import { criarAlimentoObject } from "../schemas/alimento/criarAlimentoSchema";

@Entity('alimento')
export default class Alimento extends BaseEntity {

   @PrimaryColumn('int4')
   id_alimento: number;

   @Column('uuid')
   id_criador: string;

   @Column('text')
   nome_alimento: string;

   @Column('varchar', { length: 20 })
   estado_alimento: string;

   @Column('boolean')
   alimento_verificado: boolean;

   @Column('varchar', { length: 25 })
   grupo_excludente: string;

   @Column('text')
   marca_alimento: string | null;
   
   @Column('timestamp')
   dtt_criacao_alimento: string;
   
   @ManyToOne(() => Usuario, (usuario) => usuario.alimentos)
   @JoinColumn({ name: "id_criador" })
   usuario: Usuario;

   constructor(criarAlimentoObject: criarAlimentoObject) {
      super();
      if(criarAlimentoObject){
         this.id_criador = criarAlimentoObject.id_criador;
         this.nome_alimento = criarAlimentoObject.nome_alimento;
         this.estado_alimento = criarAlimentoObject.estado_alimento;
         this.grupo_excludente = criarAlimentoObject.grupo_excludente;
         this.alimento_verificado = false;
         this.marca_alimento = criarAlimentoObject.marca_alimento || null;
         this.dtt_criacao_alimento = new Date().toISOString();
      }
   }

   public atualizar(dadosAtualizacao: any): void {

  }
  
}