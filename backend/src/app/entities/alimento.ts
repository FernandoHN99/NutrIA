import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import Usuario from "./usuario";
import AlimentoConsumido from "./alimentoConsumido";
import AlimentoFavorito from "./alimentoFavorito";
import CodigoDeBarras from "./codigoDeBarras"
import { criarAlimentoObject } from "../schemas/alimento/criarAlimentoSchema";
import { atualizarAlimentoObject } from "../schemas/alimento/atualizarAlimentoSchema";
import { join } from "path";

@Entity('alimento')
export default class Alimento extends BaseEntity {

   @PrimaryColumn('int4', { generated: true })
   id_alimento: number;

   @Column('uuid')
   id_usuario: string;

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

   @Column('boolean')
   alimento_ativo: boolean;
   
   @ManyToOne(() => Usuario, (usuario) => usuario.alimentos)
   @JoinColumn({ name: 'id_usuario' })
   usuario: Usuario;

   @OneToMany(() => AlimentoConsumido, (alimentoConsumido) => alimentoConsumido.alimento)
   @JoinColumn({ name: 'id_alimento' })
   alimentosConsumidos: AlimentoConsumido[];

   @OneToMany(() => AlimentoFavorito, (alimentoFavorito) => alimentoFavorito.alimento)
   @JoinColumn({ name: 'id_alimento' })
   usuariosFavoritados: AlimentoFavorito[];

   @ManyToOne( () => CodigoDeBarras, (codigoDeBarras) => codigoDeBarras.alimentos)
   @JoinColumn({ name: 'id_alimento' })
   codigoDeBarras: CodigoDeBarras;

   constructor(dadosCriacao: criarAlimentoObject) {
      super();
      if(dadosCriacao){
         Object.assign(this, dadosCriacao);
      }
   }

   public atualizarDados(dadosAtualizacao: atualizarAlimentoObject) {
      Object.assign(this, dadosAtualizacao);
   }
  
}