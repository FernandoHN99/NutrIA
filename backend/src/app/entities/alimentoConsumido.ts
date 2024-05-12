import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import Usuario from "./usuario";


@Entity('alimento_consumido')
export default class AlimentoConsumido extends BaseEntity {
   @PrimaryColumn('int8')
   id_alimento_consumido: number;

   @Column('int')
   numero_refeicao: number;

   @Column('int4')
   id_alimento: number;

   @Column('int4')
   id_prato: number;

   @Column('date')
   dt_dia: Date;

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

}