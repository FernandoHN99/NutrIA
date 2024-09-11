export const encontrarPerfilPorData = (perfisData: any[], diaSelecionado: string) => {
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
   return perfilEncontrado;
};

const jsonDiaVazio = {
   totalProteina: 0,
   totalCarboidrato: 0,
   totalGordura: 0,
   totalAlcool: 0,
   totalKcal: 0,
}

export const totalValues = (consumoDoDia: any[]) => {
   return consumoDoDia.reduce((acc, { kcal, qtde_gordura, qtde_carboidrato, qtde_proteina, qtde_alcool }) => {
      return {
         totalProteina: acc.totalProteina + qtde_proteina,
         totalCarboidrato: acc.totalCarboidrato + qtde_carboidrato,
         totalGordura: acc.totalGordura + qtde_gordura,
         totalAlcool: acc.totalAlcool + qtde_alcool,
         totalKcal: acc.totalKcal + kcal,
      };
   }, { ...jsonDiaVazio });
};


export const totalValuesByRefeicao = (consumoDoDia: any[]) => {
   return consumoDoDia.reduce((acc, { numero_refeicao, kcal, qtde_gordura, qtde_carboidrato, qtde_proteina, qtde_alcool }) => {
     if (!acc[numero_refeicao]) {
       acc[numero_refeicao] = {
         totalProteina: 0,
         totalCarboidrato: 0,
         totalGordura: 0,
         totalAlcool: 0,
         totalKcal: 0,
       };
     }
 
     acc[numero_refeicao] = {
       totalProteina: acc[numero_refeicao].totalProteina + qtde_proteina,
       totalCarboidrato: acc[numero_refeicao].totalCarboidrato + qtde_carboidrato,
       totalGordura: acc[numero_refeicao].totalGordura + qtde_gordura,
       totalAlcool: acc[numero_refeicao].totalAlcool + qtde_alcool,
       totalKcal: acc[numero_refeicao].totalKcal + kcal,
     };
 
     return acc;
   }, {} as Record<string, { totalProteina: number, totalCarboidrato: number, totalGordura: number, totalAlcool: number, totalKcal: number }>);
 };