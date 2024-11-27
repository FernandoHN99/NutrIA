export interface criarPerfilSchema {
   peso_inicial: number;
   peso_final: number;
   altura: number;
   nivel_atividade: string;
   objetivo: string;
   tmb: number;
   tmt: number;
   tmf: number;
   meta_proteina: number;
   meta_carboidrato: number;
   meta_gordura: number;
   proteina_peso: number;
   carboidrato_peso: number;
   gordura_peso: number;
}

export interface Perfil {
   peso_inicial: number;
   peso_final: number;
   altura: number;
   nivel_atividade: string;
   objetivo: string;
   tmb: number;
   tmt: number;
   tmf: number;
   meta_proteina: number;
   meta_carboidrato: number;
   meta_gordura: number;
   proteina_peso: number;
   carboidrato_peso: number;
   gordura_peso: number;
   id_perfil: number;
   dt_criacao_perfil: string;
}