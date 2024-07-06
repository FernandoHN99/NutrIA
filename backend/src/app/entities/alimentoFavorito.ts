import { Entity, Column, PrimaryColumn, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import Usuario from "./usuario";
import Alimento from "./alimento";
import { salvarAlimentoFavoritoObject } from "../schemas/alimentoFavorito/salvarAlimentoFavoritoSchema";

@Entity('alimento_favorito')
export default class AlimentoFavorito extends BaseEntity {

   @PrimaryColumn('uuid')
   id_usuario: string;

   @PrimaryColumn('int4')
   id_alimento: number;

   @Column('timestamp')
   dtt_alimento_favoritado: string;

   @ManyToOne(() => Usuario, usuario => usuario.alimentosFavoritos)
   @JoinColumn({ name: 'id_usuario' })
   usuario: Usuario;

   @ManyToOne(() => Alimento, alimento => alimento.alimentosFavoritos)
   @JoinColumn({ name: 'id_alimento' })
   alimento: Alimento;

   constructor(dadosCriacao: salvarAlimentoFavoritoObject) {
      super();
      if(dadosCriacao){
         Object.assign(this, dadosCriacao);
      }
   }
}