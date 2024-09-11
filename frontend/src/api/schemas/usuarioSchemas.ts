
export interface fazerLoginSchema {
   email: string;
   password: string;
}

export interface criarUsuarioSchema {
   email: string;
   nome: string;
   sobrenome: string;
   password: string;
   dt_nascimento: string;
   pais: string;
   sexo: string;
   sistema_metrico: string;
   perfil_alimentar: string;
}