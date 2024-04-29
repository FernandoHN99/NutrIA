import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { criarUsuarioObject } from "../schemas/usuario/criarUsuarioSchema";

@Entity('usuario')
export default class Usuario extends BaseEntity {

   constructor(obj= {}) {
      super()
      Object.assign(this, obj)
    }

   @PrimaryGeneratedColumn('uuid')
   id_usuario: string;

   @Column('date')
   dt_nascimento: string;

   @Column('text')
   nome: string;

   @Column('text')
   sobrenome: string;

   @Column('text')
   pais: string;

   @Column('text')
   sexo: string;

   @Column('varchar', { length: 10 })
   sistema_metrico: string;

   @Column('varchar', { length: 20 })
   perfil_alimentar: string;

}