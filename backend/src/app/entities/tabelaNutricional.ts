import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import Alimento from "./alimento";
import Util from "../../utils/util";
import { criarTabelaNutricionalObject } from "../schemas/tabelaNutricional/criarTabelaNutricionalSchema";
import { atualizarTabelaNutricionalObject } from "../schemas/tabelaNutricional/atualizarTabelaNutricionalSchema";

@Entity('tabela_nutricional')
export default class TabelaNutricional extends BaseEntity {

   @PrimaryColumn('int4', { generated: true })
   id_tabela_nutricional: number;

   @Column('int')
   id_alimento: number;

   @Column('text')
   unidade_medida: string;

   @Column('int')
   porcao_padrao: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   kcal: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_proteina: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_carboidrato: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_gordura: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_alcool: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_acucar: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_fibra: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_saturada: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_monosaturada: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_polisaturada: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_trans: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_sodio: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_calcio: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_ferro: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_potassio: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_vitamina_a: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_vitamina_c: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_vitamina_d: number;

   @Column('numeric', { precision: 6, scale: 1, transformer: Util.transformerStringNumber })
   qtde_vitamina_e: number;

   @ManyToOne(() => Alimento, (alimento) => alimento.codigoDeBarras)
   @JoinColumn({ name: "id_alimento" })
   alimento: Alimento;

   constructor(dadosCriacao: criarTabelaNutricionalObject) {
      super();
      if(dadosCriacao){
         Object.assign(this, dadosCriacao);
      }
   }

   public atualizarDados(dadosAtualizacao: atualizarTabelaNutricionalObject): void {
      Object.assign(this, dadosAtualizacao);
   }
}