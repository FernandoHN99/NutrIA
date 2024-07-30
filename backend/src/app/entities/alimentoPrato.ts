import { Entity, Column, BaseEntity, OneToOne, ManyToOne, JoinColumn, PrimaryGeneratedColumn} from "typeorm";
import Util from '../../utils/util';
import Prato from "./prato";
import Alimento from "./alimento";
import { criarAlimentoPratoObject } from "../schemas/alimentoPrato/criarAlimentoPratoSchema";
import { atualizarAlimentoPratoObject } from "../schemas/alimentoPrato/atualizarAlimentoPratoSchema";
import { upsertAlimentoPratoObject } from "../schemas/alimentoPrato/upsertAlimentoPratoSchema";

@Entity('alimento_prato')
export default class AlimentoPrato extends BaseEntity {

   @PrimaryGeneratedColumn()
   id_alimento_prato: number;

   @Column('int')
   id_prato: number;

   @Column('int')
   id_alimento: number;

   @Column('text')
   unidade_medida: string;

   @Column('int')
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
   
   @ManyToOne(() => Prato, (prato) => prato.alimentosPrato)
   @JoinColumn({ name: 'id_prato' })
   prato: Prato;

   @OneToOne(() => Alimento, (alimento) => alimento.alimentoPrato)
   @JoinColumn({ name: 'id_alimento' })
   alimento: Alimento;

   constructor(dadosCriacao: criarAlimentoPratoObject) {
      super();
      if(dadosCriacao){
         Object.assign(this, dadosCriacao);
      }
   }

   public atualizarDados(dadosAtualizacao: atualizarAlimentoPratoObject): void {
      Object.assign(this, dadosAtualizacao);
   }
}