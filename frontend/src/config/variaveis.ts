// export const DOMINIO_BACKEND: string = 'http://192.168.15.251';
export const DOMINIO_BACKEND: string = 'http://127.0.0.1';

export const PORTA_BACKEND: number = 5001;
export const ENDPOINT: string = '/nutria'
export const URL_BACKEND: string = `${DOMINIO_BACKEND}:${PORTA_BACKEND}${ENDPOINT}`


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

