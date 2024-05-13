import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { criarAlimentoConsumidoObject } from "../schemas/alimentoConsumido/criarAlimentoConsumidoSchema";
import Usuario from "./usuario";


@Entity('alimento_consumido')
export default class AlimentoConsumido extends BaseEntity {
   @PrimaryColumn('int8', { generated: true })
   id_alimento_consumido: number;

   @PrimaryColumn('uuid')
   id_usuario: string;

   @Column('int')
   numero_refeicao: number;

   @Column('int4')
   id_alimento: number;

   @Column('int4')
   id_prato: number | null;

   @Column('date')
   dt_dia: string;

   @Column('text')
   unidade_medida: string;

   @Column('integer')
   porcao_padrao: number;

   @Column('numeric', { precision: 5, scale: 1 })
   qtde_utilizada: number;

   @Column('numeric', { precision: 6, scale: 1 })
   qtde_proteina: number;

   @Column('numeric', { precision: 6, scale: 1 })
   qtde_carboidrato: number;

   @Column('numeric', { precision: 6, scale: 1 })
   qtde_gordura: number;

   @Column('numeric', { precision: 6, scale: 1 })
   qtde_alcool: number;

   @ManyToOne(() => Usuario, usuario => usuario.alimentosConsumidos)
   @JoinColumn({name: 'id_usuario'})
   usuario: Usuario;

   constructor (criarAlimentoConsumido: criarAlimentoConsumidoObject){
      super();
      if(criarAlimentoConsumido){
         this.id_usuario = criarAlimentoConsumido.id_usuario;
         this.numero_refeicao = criarAlimentoConsumido.numero_refeicao;
         this.id_alimento = criarAlimentoConsumido.id_alimento;
         this.id_prato = criarAlimentoConsumido.id_prato;
         this.dt_dia = criarAlimentoConsumido.dt_dia;
         this.unidade_medida = criarAlimentoConsumido.unidade_medida;
         this.porcao_padrao = criarAlimentoConsumido.porcao_padrao;
         this.qtde_utilizada = criarAlimentoConsumido.qtde_utilizada;
         this.qtde_proteina = criarAlimentoConsumido.qtde_proteina;
         this.qtde_carboidrato = criarAlimentoConsumido.qtde_carboidrato;
         this.qtde_gordura = criarAlimentoConsumido.qtde_gordura;
         this.qtde_alcool = criarAlimentoConsumido.qtde_alcool;
      }    
   }

}