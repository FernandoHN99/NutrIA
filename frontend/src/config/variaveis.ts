// export const DOMINIO_BACKEND: string = 'http://192.168.15.247';
// export const DOMINIO_BACKEND: string = 'http://192.168.15.251';
export const DOMINIO_BACKEND: string = 'http://127.0.0.1';

export const PORTA_BACKEND: number = 5001;
export const ENDPOINT: string = '/nutria'
export const URL_BACKEND: string = `${DOMINIO_BACKEND}:${PORTA_BACKEND}${ENDPOINT}`
export const TOKEN_KEY = 'authToken';
export const REFRESH_KEY = 'refreshToken';

export const listaRotasSemAuth: Array<string> = ['/usuario/criar', '/usuario/login'];
export const tiposDeCartao: Array<string> = ['MACROS', 'CALORIAS', 'DIETA FLEXIVEL'];
export const listaEstadosAlimentos: Array<string> = ['CRU', 'COZIDO', 'ASSADO', 'FRITO', 'GRELHADO', 'PADRAO'];
export const listaUnidadesMedida: Array<string> = ['GRAMA', 'MILILITRO', 'COLHER SOPA', 'COLHER CHA', 'XICARA PADRAO', 'XICARA CHA', 'XICARA CAFE', 'UNIDADE'];
export const listaSistemasMedidas: Array<string> = ['METRICO', 'IMPERIAL'];
export const mapSexosBiologicos: { [key: string]: string } = {
   'Masculino':'M', 
   'Feminino': 'F'
};
export const mapPerfisAlimentares:  { [key: string]: string }  = {
   'Onívora': 'ONIVORO', 
   'Vegetariana': 'VEGETARIANO', 
   'Vegana': 'VEGANO'
};
export const mapNiveisDeAtividade: { [key: string]: string } = {
   'Sedentário': 'SENDENTARIO', 
   'Leve':'LEVE', 
   'Moderado': 'MODERADO', 
   'Intenso': 'INTENSO', 
   'Muito Intenso': 'EXTREMO'
};
export const mapMultNiveisDeAtividade: { [key: string]: number } = {
   'SENDENTARIO': 1.2, 
   'LEVE': 1.375, 
   'MODERADO': 1.55, 
   'INTENSO': 1.725, 
   'EXTREMO': 1.9
};
export const mapObjetivos: { [key: string]: string } = { 
   'Perda de Peso': 'PERDA', 
   'Manutenção': 'MANUTENCAO',
   'Ganho de Peso': 'GANHO'
}

export const mapUnidadesDeMedida = {
   'Gramas': 'GRAMA', 
   'Mililitros': 'MILILITRO', 
   'Colher de Sopa': 'COLHER SOPA', 
   'Xícara de Chá': 'XICARA CHA',
   'Xícara de Café ': 'XICARA CAFE',
   'Colher de Chá': 'COLHER CHA',
   'Xícara': 'XICARA PADRAO',
   'Unidade': 'UNIDADE'
};

export const mapTamanhoDaPorcao: { [key: string]: Array<string> } = {
   'GRAMA': ['1', '100', '200', '300', '400', '500'],
   'MILILITRO': ['100', '200', '300', '400', '500'],
   'COLHER SOPA': ['1', '2', '3', '4', '5'],
   'COLHER CHA': ['1', '2', '3', '4', '5'],
   'XICARA PADRAO': ['1', '2', '3', '4', '5'],
   'XICARA CHA': ['1', '2', '3', '4', '5'],
   'XICARA CAFE': ['1', '2', '3', '4', '5'],
   'UNIDADE': ['1', '2', '3', '4', '5']
};

export const helperModalTexts: { [key: string]: {title: string, message: string} } = {
   nivelAtividade: {
      title: 'Nível de Atividade',
      message: 'Sedentário: Exercício mínimo \n Leve: 1-3 dias por semana \n Moderado: 3-5 dias por semana \n Intenso: 6-7 dias por semana \n Muito Intenso: Atleta, 2x por dia'
   },
   objetivo: {
      title: 'Objetivo',
      message: 'O objetivo é um fator importante para calcular o gasto calórico diário.'
   },
   tmb: {
      title: 'Taxa Metabólica Basal - TMB',
      message: 'É a quantidade necessária de kcal que seu corpo gasta em um dia para se manter em repouso.'
   },
   tmt: {
      title: 'Taxa Metabólica Total - TMT',
      message: 'É a quantidade de kcal que seu corpo gasta em um dia considerando seu nível de atividade.\n\n TMT = TMB + Nível de Atividade'
   },
   tmf: {
      title: 'Taxa Metabólica Final - TMF',
      message: 'É a quantidade de kcal ideal que você deve ingerir por dia para atingir seu objetivo. \n\n TMF = TMB + Nível de Atividade + Objetivo'
   },
}

