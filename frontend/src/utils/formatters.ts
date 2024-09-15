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

export const somarMacrosDiaPorRefeicao = ( consumoDoDia: any[], refeicoesAtivas: any[] ) => {
   const acc = refeicoesAtivas.reduce((acc, { numero_refeicao, nome_refeicao }) => {
      acc[numero_refeicao] = { numero_refeicao, nome_refeicao, ...jsonMacrosDiaVazio };
      return acc;
   }, {} as Record<string, typeof jsonMacrosDiaVazio>);

   consumoDoDia.forEach(
      ({
         numero_refeicao,
         refeicao,
         kcal,
         qtde_gordura,
         qtde_carboidrato,
         qtde_proteina,
         qtde_alcool,
      }) => {
         if (!acc[numero_refeicao]) {
            acc[numero_refeicao] = {...jsonMacrosDiaVazio };
         }

         acc[numero_refeicao] = {
            ...acc[numero_refeicao],
            totalProteina: acc[numero_refeicao].totalProteina + qtde_proteina,
            totalCarboidrato: acc[numero_refeicao].totalCarboidrato + qtde_carboidrato,
            totalGordura: acc[numero_refeicao].totalGordura + qtde_gordura,
            totalAlcool: acc[numero_refeicao].totalAlcool + qtde_alcool,
            totalKcal: acc[numero_refeicao].totalKcal + kcal,
         };
         acc[numero_refeicao] = { ...acc[numero_refeicao], numero_refeicao, nome_refeicao: refeicao.nome_refeicao };
      }
   );

   return roundJsonValues(acc);
};

export const filtrarRefeicoesAtivas = (refeicoes: any[] | undefined) => {
   return refeicoes ? refeicoes.filter(refeicao => refeicao.ativa === true) : null;
}

export const filtrarConsumoDia = (consumoTotal: any[] | undefined, diaSelecionado: string) => {
   return consumoTotal ? consumoTotal.filter(consumoDia => consumoDia.dt_dia == diaSelecionado) : null;
}

export const filtrarConsumoRefeicao = (consumoDia: any[], numeroRefeicao: number) => {
   return consumoDia.filter(consumoDia => consumoDia.numero_refeicao == numeroRefeicao);
}