import { AlimentoSchema } from "./alimentoSchema";

export interface obterConsumoUsuarioSchema {
   dataInicio: string;
   dataFim: string;
}

export interface AddAlimentoConsumidoSchema {
   numero_refeicao: number;
   id_alimento: number;
   nome_consumo: string | null;
   id_prato: number | null;
   dt_dia: string;
   unidade_medida: string;
   porcao_padrao: number;
   qtde_utilizada: number;
   qtde_proteina: number;
   qtde_carboidrato: number;
   qtde_gordura: number;
   qtde_alcool: number;
   kcal: number;
}

export interface AtualizarConsumoUsuarioSchema extends AddAlimentoConsumidoSchema {
   id_alimento_consumido?: number;
}

export interface DeletarConsumoUsuarioSchema {
   id_alimento_consumido: number;
}

export interface ConsumoAlimentoSchema extends AtualizarConsumoUsuarioSchema {
   alimento: AlimentoSchema;
}