import { Dimensions } from 'react-native';
import { IMacronutrientes } from './interfaces';

export const getScreenDimensions = () => {
   const { width, height } = Dimensions.get('window');
   return { width, height };
};

export const getResponsiveSizeWidth = (percentage: number) => {
   const { width } = getScreenDimensions();
   return width * (percentage / 100);
};

export const getResponsiveSizeHeight = (percentage: number) => {
   const { height } = getScreenDimensions();
   return height * (percentage / 100);
};

export const hexToRgba = (hex: string, opacity: string) => {
   const r = parseInt(hex.slice(1, 3), 16);
   const g = parseInt(hex.slice(3, 5), 16);
   const b = parseInt(hex.slice(5, 7), 16);

   return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const formatarDataStrISO = (data: string) => {
   const [dia, mes, ano] = data.split('/');
   return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
}

export const capitalize = (str: string) => {
   if (typeof str !== 'string' || str.length === 0) {
      return '';
   }
   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Formula Harris Benedict
export const calcularTMB = (idade: number, peso: number, altura: number, sexo: string) => {
   if (sexo.toLocaleUpperCase() === 'H') {
      return (10 * peso) + (6.25 * altura) - (5 * idade) + 5
   }
   return (10 * peso) + (6.25 * altura) - (5 * idade) - 161
}

export const calcularTMT = (tmb: number, multAtividade: number) => {
   return tmb * multAtividade;
}

export const calcularTMF = (tmt: number, objetivo: string, ajuste: number) => {
   if (objetivo.toLocaleUpperCase() === 'PERDA') {
      return tmt * ajuste;
   }
   else if (objetivo.toLocaleUpperCase() === 'GANHO') {
      return tmt + ajuste;
   }
   return tmt;
}

export const calcularPesoCarboidrato = (tmf: number, peso: number, proteinaPeso: number, gorduraPeso: number) => {
   return ((tmf - (peso * proteinaPeso * 4 + peso * gorduraPeso * 9)) / 4) / peso
}

export const calcularIdade = (dataNascimento: string) => {
   const dataAtual = new Date()
   const [ano, mes, dia] = dataNascimento.split('-').map(Number);
   const dataNasc = new Date(ano, mes - 1, dia);

   let idade = dataAtual.getFullYear() - dataNasc.getFullYear();
   const mesAtual = dataAtual.getMonth();
   const diaAtual = dataAtual.getDate();

   if (mesAtual < dataNasc.getMonth() || (mesAtual === dataNasc.getMonth() && diaAtual < dataNasc.getDate())) {
      idade--;
   }
   return idade;
}

export const arredondarValores = (valor: number, casasDeciamais: number = 0) => {
   return parseFloat(valor.toFixed(casasDeciamais));
}

export const transformDateIntoString = (date: Date) => {
   return date.toISOString().split('T')[0];
}

export const criarStrData = (dias: number = 0, meses: number = 0, anos: number = 0, data: Date = new Date()) => {
   return new Date(data.getFullYear() + anos, data.getMonth() + meses, data.getDate() + dias).toISOString().split('T')[0];
}

export const criarData = (dias: number = 0, meses: number = 0, anos: number = 0, data: Date = new Date()) => {
   return new Date(data.getFullYear() + anos, data.getMonth() + meses, data.getDate() + dias);
}

export const roundJsonValues = (jsonData: { [key: string]: any }, casasDecimais: number = 0): { [key: string]: any } => {
   const jsonArredondado: { [key: string]: any } = {};

   Object.keys(jsonData).forEach(key => {
      const value = jsonData[key];

      if (typeof value === 'number') {
         jsonArredondado[key] = parseFloat(value.toFixed(casasDecimais));
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
         jsonArredondado[key] = roundJsonValues(value, casasDecimais);
      } else {
         jsonArredondado[key] = value;
      }
   });
   return jsonArredondado;
};

export const calcularMacrosPorPorcao = (
   porcaoBase: number,
   qtdeUtilizada: number,
   macrosBase: { [key: string]: number }) => {
   const qtdeCarboidrato = (macrosBase.carboidrato * qtdeUtilizada) / porcaoBase;
   const qtdeProteina = (macrosBase.proteina * qtdeUtilizada) / porcaoBase;
   const qtdeGordura = (macrosBase.gordura * qtdeUtilizada) / porcaoBase;
   const qtdeAlcool = (macrosBase.alcool * qtdeUtilizada) / porcaoBase;
   const qtdeKcal = (macrosBase.kcal * qtdeUtilizada) / porcaoBase;
   return { qtdeCarboidrato, qtdeProteina, qtdeGordura, qtdeAlcool, qtdeKcal };
};

export const encontrarChavePeloValorJSON = (obj: { [key: string]: any }, valorProcurado: any) => {
   return Object.keys(obj).find(key => obj[key] === valorProcurado);
};

export const validadeString = (str: string) => {
   return str !== undefined && str !== null && str.trim() !== '';
};

export const validarNumero = (value: number) => {
   return !isNaN(value) && value !== undefined && value !== null;
};

export const validarNumeroMaiorZero = (value: number) => {
   return validarNumero(value) && value > 0;
};

export const handleNumberInput = (input: string, allowDecimal: boolean, maxValue?: number, minValue?: number): string => {
   if (!input.trim()) {
      return ''
   }

   let numericText = '';

   if (allowDecimal) {
      numericText = input.replace(/[^0-9.]/g, '');

      const parts = numericText.split('.');
      if (parts.length > 2) {
         numericText = parts.shift() + '.' + parts.join('');
      }
      numericText = numericText.replace(/(\..*)\./g, '$1');
   } else {
      numericText = input.replace(/[^0-9]/g, '');
   }

   if (maxValue) {
      const numericValue = parseFloat(numericText);
      if (!isNaN(numericValue) && numericValue > maxValue) {
         numericText = maxValue.toString();
      }
   }

   if (minValue) {
      const numericValue = parseFloat(numericText);
      if (!isNaN(numericValue) && numericValue < minValue) {
         numericText = minValue.toString();
      }
   }
   return numericText;

};

export const calcularMacronutrientes = (
   qtdePadrao: number, 
   qtdeDesejada: number,
   macronutrientesPadrao: IMacronutrientes
): IMacronutrientes => {
   const fatorConversao = qtdeDesejada / qtdePadrao;

   return {
      carboidratos: arredondarValores(macronutrientesPadrao.carboidratos * fatorConversao,1),
      proteinas: arredondarValores(macronutrientesPadrao.proteinas * fatorConversao,1),
      gorduras: arredondarValores(macronutrientesPadrao.gorduras * fatorConversao,1),
      alcool: arredondarValores(macronutrientesPadrao.alcool * fatorConversao,1),
      kcal: arredondarValores(macronutrientesPadrao.kcal * fatorConversao),
   };
};

export const limitarValor = (valor: number, minimo: number, maximo: number) => {
   return Math.min(Math.max(valor, minimo), maximo);
};
