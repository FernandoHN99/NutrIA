import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { criarAlimentoConsumidoObject } from "../schemas/alimentoConsumido/criarAlimentoConsumidoSchema";
import { atualizarAlimentoConsumidoObject } from "../schemas/alimentoConsumido/atualizarAlimentoConsumidoSchema";
import Usuario from "./usuario";
import Alimento from "./alimento";
import Refeicao from "./refeicao";
import Prato from "./prato";
import Util from '../../utils/util';

@Entity('alimento_consumido')
export default class AlimentoConsumido extends BaseEntity {
   @PrimaryColumn('int8', { generated: true, transformer: Util.transformerStringNumber })
   id_alimento_consumido: number;
   
   @PrimaryColumn('uuid')
   id_usuario: string;

   @Column('int')
   numero_refeicao: number;

   @Column('int4')
   id_alimento: number | null;

   @Column('text')
   nome_consumo: string | null;

   @Column('int4')
   id_prato: number | null;

   @Column('date')
   dt_dia: string;

   @Column('text')
   unidade_medida: string;

   @Column('integer')
   porcao_padrao: number;

   @Column('numeric', { precision: 5, scale: 1, transformer: Util.transformerStringNumber })
   qtde_utilizada: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_proteina: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_carboidrato: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_gordura: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_alcool: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   kcal: number;

   @Column('timestamp')
   dtt_alimento_consumido: string;

   @ManyToOne(() => Usuario, usuario => usuario.alimentosConsumidos)
   @JoinColumn({name: 'id_usuario'})
   usuario: Usuario;

   @ManyToOne(() => Alimento, alimento => alimento.alimentosConsumidos)
   @JoinColumn({ name: 'id_alimento' })
   alimento: Alimento;

   @ManyToOne(() => Prato, prato => prato.alimentosConsumidos)
   @JoinColumn({ name: 'id_prato'})
   prato: Prato;

   @ManyToOne(() => Refeicao, refeicao => refeicao.alimentosConsumidos)
   @JoinColumn({ name: 'numero_refeicao', referencedColumnName: 'numero_refeicao' })
   @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id_usuario' })
   refeicao: Refeicao;

   constructor (criarAlimentoConsumido: criarAlimentoConsumidoObject){
      super();
      if (criarAlimentoConsumido) {
         Object.assign(this, criarAlimentoConsumido);
      }
   }

   public atualizarDados(dadosAtualizacao: atualizarAlimentoConsumidoObject) {
      Object.assign(this, dadosAtualizacao);
  }

}