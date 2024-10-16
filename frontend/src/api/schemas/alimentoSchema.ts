export interface buscarAlimentosSchema {
   nome?: string;
   pegar?: string;
   pular?: string;
}

export interface TabelaNutricional {
   id_tabela_nutricional: number;
   id_alimento: number;
   unidade_medida: string;
   porcao_padrao: number;
   kcal: number;
   qtde_proteina: number;
   qtde_carboidrato: number;
   qtde_gordura: number;
   qtde_alcool: number;
   qtde_acucar: number;
   qtde_fibra: number;
   qtde_saturada: number;
   qtde_monosaturada: number;
   qtde_polisaturada: number;
   qtde_trans: number;
   qtde_sodio: number;
   qtde_calcio: number;
   qtde_ferro: number;
   qtde_potassio: number;
   qtde_vitamina_a: number;
   qtde_vitamina_c: number;
   qtde_vitamina_d: number;
   qtde_vitamina_e: number;
 }
 
 export interface AlimentoSchema {
   id_alimento: number;
   id_usuario: number | null;
   nome_alimento: string;
   estado_alimento: string;
   alimento_verificado: boolean;
   grupo_alimentar: string;
   marca_alimento: string | null;
   dtt_criacao_alimento: string;
   alimento_ativo: boolean;
   tabelasNutricionais: TabelaNutricional[];
 }
 
 interface AlimentoFavoritado {
   dtt_alimento_favoritado: string;
   alimento: AlimentoSchema;
 }
 