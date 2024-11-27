export interface criarRefeicaoSchema {
   nome_refeicao: string;
}

export interface deletarRefeicaoSchema {
   numero_refeicao: number;
   ativa?: boolean;
}

export interface reativarRefeicaoSchema {
   nome_refeicao: string;
   numero_refeicao: number;
   ativa?: boolean;
}

export interface atualizarRefeicaoSchema {
   nome_refeicao: string;
   numero_refeicao: number;
}