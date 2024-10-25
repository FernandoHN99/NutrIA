import { AtualizarConsumoUsuarioSchema, ConsumoAlimentoSchema } from "../api/schemas/alimentoConsumidoSchema";
import { AlimentoSchema, TabelaNutricional } from "../api/schemas/alimentoSchema";
import { mapObjetivos } from "../config/variaveis";
import { criarStrData, encontrarChavePeloValorJSON, roundJsonValues } from "./utils";

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

export const formatarConsumoRapido = (consumoRapido: AtualizarConsumoUsuarioSchema): ConsumoAlimentoSchema => {
   const tabelaNutricional : TabelaNutricional = 
      {
         id_tabela_nutricional: null!,
         id_alimento: null!,
         unidade_medida: consumoRapido.unidade_medida,
         porcao_padrao: (consumoRapido.porcao_padrao * consumoRapido.qtde_utilizada),
         kcal: consumoRapido.kcal,
         qtde_proteina: consumoRapido.qtde_proteina,
         qtde_carboidrato: consumoRapido.qtde_carboidrato,
         qtde_gordura: consumoRapido.qtde_gordura,
         qtde_alcool: consumoRapido.qtde_alcool,
         qtde_acucar: null!,
         qtde_fibra: null!,
         qtde_saturada: null!,
         qtde_monosaturada: null!,
         qtde_polisaturada: null!,
         qtde_trans: null!,
         qtde_sodio: null!,
         qtde_calcio: null!,
         qtde_ferro: null!,
         qtde_potassio: null!,
         qtde_vitamina_a: null!,
         qtde_vitamina_c: null!,
         qtde_vitamina_d: null!,
         qtde_vitamina_e: null!,
      };

   const alimento: any = {
      nome_alimento: consumoRapido.nome_consumo,
      estado_alimento: 'PADRAO',
      tabelasNutricionais: [tabelaNutricional]
   }
   return {...consumoRapido, alimento};
}


export const gerarTextoPerfil = (usuarioInfo:any, perfilInfo:any, refeicoes:any[]) => {
   const { nome, dt_nascimento, email, pais, perfil_alimentar, sexo } = usuarioInfo;
   const { altura, peso_inicial, peso_final, objetivo, nivel_atividade, meta_proteina, meta_carboidrato, meta_gordura, tmb, tmf, kcal } = perfilInfo;
   
   const dataNascimento = new Date(dt_nascimento);
   const idade = new Date().getFullYear() - dataNascimento.getFullYear();

   const texto = `Meu nome é ${nome} tenho ${idade} anos, sou ${sexo === 'H' ? 'homem' : 'mulher'}, tenho ${altura} cm, e peso ${peso_inicial} kg, além de ser ${perfil_alimentar.toLocaleLowerCase()}. ` +
                 `Meu objetivo é de ${objetivo.toLocaleLowerCase()} de peso e meu nível de atividade física é ${nivel_atividade.toLocaleLowerCase()}. ` +
                 `Minha tmb (taxa metabólica basal) é ${tmb} kcal e minha tmf (meta de kcal diária) é ${tmf} kcal. `+
                 `Minhas metas diárias de maronutrientes são ${meta_proteina}g de proteína, ${meta_carboidrato}g de carboidrato e ${meta_gordura}g de gordura. `+
                 `Hoje é dia ${criarStrData()}.Minhas refeicoes são: ${refeicoes.map(refeicao => refeicao.nome_refeicao).join(', ')}. `
   return texto;
}
