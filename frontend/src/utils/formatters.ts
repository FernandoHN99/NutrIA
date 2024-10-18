import { roundJsonValues } from "./utils";

export const encontrarPerfilPorData = (perfisData: any[] | undefined, diaSelecionado: string) => {
   if (!perfisData) {
      return null;
   }
   const diaSelecionadoDt = new Date(diaSelecionado);
   let perfilEncontrado = null;

   if (diaSelecionadoDt <= new Date(perfisData[0].dt_criacao_perfil)) {
      return perfisData[0];
   }

   for (let i = 0; i < perfisData.length; i++) {
      const perfil = perfisData[i];
      const dtCriacao = new Date(perfil.dt_criacao_perfil);

      if (diaSelecionadoDt >= dtCriacao) {
         perfilEncontrado = perfil;
      } else if (perfilEncontrado) {
         break;
      }
   }
   return roundJsonValues(perfilEncontrado);
};

const jsonMacrosDiaVazio = {
   totalProteina: 0,
   totalCarboidrato: 0,
   totalGordura: 0,
   totalAlcool: 0,
   totalKcal: 0,
}

export const somarMacrosDia = (consumoDoDia: any[]) => {
   const consumoNoRounded = consumoDoDia.reduce((acc, { kcal, qtde_gordura, qtde_carboidrato, qtde_proteina, qtde_alcool }) => {
      return {
         totalProteina: acc.totalProteina + qtde_proteina,
         totalCarboidrato: acc.totalCarboidrato + qtde_carboidrato,
         totalGordura: acc.totalGordura + qtde_gordura,
         totalAlcool: acc.totalAlcool + qtde_alcool,
         totalKcal: acc.totalKcal + kcal,
      };
   }, { ...jsonMacrosDiaVazio });

   return roundJsonValues(consumoNoRounded);

};

export const somarMacrosDiaPorRefeicao = (
   consumoDoDia: any[],
   refeicoesAtivas: any[]
) => {
   const refeicoesMap = refeicoesAtivas.reduce((map, { numero_refeicao, nome_refeicao }) => {
      map[numero_refeicao] = { numero_refeicao, nome_refeicao, ...jsonMacrosDiaVazio };
      return map;
   }, {} as Record<string, typeof jsonMacrosDiaVazio>);

   consumoDoDia.forEach((consumo) => {
      const {
         numero_refeicao,
         refeicao,
         kcal,
         qtde_gordura,
         qtde_carboidrato,
         qtde_proteina,
         qtde_alcool
      } = consumo;

      const macrosRefeicao = refeicoesMap[numero_refeicao] || { ...jsonMacrosDiaVazio };

      refeicoesMap[numero_refeicao] = {
         ...macrosRefeicao,
         totalProteina: macrosRefeicao.totalProteina + qtde_proteina,
         totalCarboidrato: macrosRefeicao.totalCarboidrato + qtde_carboidrato,
         totalGordura: macrosRefeicao.totalGordura + qtde_gordura,
         totalAlcool: macrosRefeicao.totalAlcool + qtde_alcool,
         totalKcal: macrosRefeicao.totalKcal + kcal,
         numero_refeicao,
         nome_refeicao: refeicoesAtivas.find(r => r.numero_refeicao === numero_refeicao)?.nome_refeicao || refeicao.nome_refeicao
      };
   });

   return roundJsonValues(refeicoesMap);
};


export const filtrarRefeicoesAtivas = (refeicoes: any[] | undefined) => {
   return refeicoes ? refeicoes.filter(refeicao => refeicao.ativa === true) : null;
}

export const filtrarConsumoDia = (consumoTotal: any[], diaSelecionado: string) => {
   return consumoTotal ? consumoTotal.filter(consumoDia => consumoDia.dt_dia == diaSelecionado) : [];
}

export const filtrarConsumoRefeicao = (consumoDia: any[], numeroRefeicao: number) => {
   return consumoDia.filter(consumoDia => consumoDia.numero_refeicao == numeroRefeicao);
}