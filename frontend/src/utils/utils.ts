import { Dimensions } from 'react-native';

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
   if (sexo.toLocaleUpperCase() === 'M') {
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


export const criarStrData = (dias: number = 0, meses: number = 0, anos: number = 0, data: Date = new Date()) => {
   return new Date(data.getFullYear() + anos, data.getMonth() + meses, data.getDate() + dias).toISOString().split('T')[0];
}

export const criarData = (dias: number = 0, meses: number = 0, anos: number = 0, data: Date = new Date()) => {
   return new Date(data.getFullYear() + anos, data.getMonth() + meses, data.getDate() + dias);
}

export const roundJsonValues = (jsonData: { [key: string]: any }, casasDecimais: number = 0) => {
   const jsonArredondado: { [key: string]: number } = {};
   Object.keys(jsonData).map(key => {
      if(typeof jsonData[key] === 'number'){
         jsonArredondado[key] =  parseFloat(jsonData[key].toFixed(casasDecimais));
      }else{
         jsonArredondado[key] = jsonData[key];
      }
   });
   return jsonArredondado;
}


