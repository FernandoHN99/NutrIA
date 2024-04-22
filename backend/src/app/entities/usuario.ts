import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { criarUsuarioOutputDTO } from '../schemas/criarUsuarioSchema';

// CREATE TABLE usuario (
// 	id_usuario uuid,
// 	dt_nascimento DATE NOT NULL,
// 	dtt_conta_criacao TIMESTAMP NOT NULL,
// 	pais TEXT NOT NULL,
// 	sexo TEXT NOT NULL,
// 	sistema_metrico VARCHAR(10) NOT NULL,
// 	perfil_alimentar VARCHAR(20) NOT NULL,
// 	CONSTRAINT check_perfil_sexo CHECK (sexo IN ('H', 'M')),
// 	CONSTRAINT check_sistema_metrico CHECK (sistema_metrico IN ('METRICO', 'IMPERIAL')), 
// 	CONSTRAINT check_perfil_alimentar CHECK (perfil_alimentar IN ('ONIVORO', 'VEGETARIANO', 'VEGANO')),
//    CONSTRAINT usuario_fk_auth_user FOREIGN KEY (id_usuario) REFERENCES auth.users(id) ON DELETE CASCADE,
// 	PRIMARY KEY (id_usuario)
// );

@Entity('usuario')
export default class Usuario {
   @PrimaryGeneratedColumn('uuid')
   id_usuario: string;

   @Column('date')
   dt_nascimento: Date;

   @Column('timestamp')
   dtt_conta_criacao: Date;

   @Column('text')
   pais: string;

   @Column('text')
   sexo: string;

   @Column('varchar', { length: 10 })
   sistema_metrico: string;

   @Column('varchar', { length: 20 })
   perfil_alimentar: string;

   constructor(dto?: criarUsuarioOutputDTO) {
      if (dto) {
         this.id_usuario = 'a60fdf7b-c7f4-4778-b022-7c71040290cd';
         this.dt_nascimento = new Date(dto.dt_nascimento);
         this.pais = dto.pais;
         this.sexo = dto.sexo;
         this.sistema_metrico = dto.sistema_metrico;
         this.perfil_alimentar = dto.perfil_alimentar;
      }
      this.dtt_conta_criacao = new Date();
   }

}

