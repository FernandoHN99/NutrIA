import 'dotenv/config';

export const PORTA_BACKEND: number = 5001;
export const DOMINIO_BACKEND: string = 'http://127.0.0.1';

export const USUARIO: string = process.env.DB_USUARIO ?? '';
export const HOST: string = process.env.DB_HOST ?? '';
export const DATABASE: string = process.env.DB_DATABASE ?? '';
export const SENHA: string = process.env.DB_SENHA ?? '';
export const PORTA_DB: number = process.env.DB_PORTA ? parseInt(process.env.DB_PORTA) : 0;

export const ANON_KEY: string = process.env.ANON_KEY ?? '';
export const SERVICE_KEY: string = process.env.SERVICE_KEY ?? '';
export const API_EXTERNAL_URL: string = process.env.API_EXTERNAL_URL ?? '';
export const JWT_SECRET: string = process.env.JWT_SECRET ?? '';


export const tiposDeCartao: Array<string> = ['MACROS', 'CALORIAS', 'DIETA FLEXIVEL'];
export const listaRotasSemAuth: Array<string> = ['/nutria/usuario/criar', '/nutria/usuario/login'];
export const listaEstadosAlimentos: Array<string> = ['CRU', 'COZIDO', 'ASSADO', 'FRITO', 'GRELHADO', 'PADRAO'];
export const listaUnidadesMedida: Array<string> = ['GRAMA', 'MILILITRO', 'COLHER SOPA', 'COLHER CHA', 'XICARA PADRAO', 'XICARA CHA', 'XICARA CAFE', 'UNIDADE'];
export const listaSexosBiologicos: Array<string> = ['H', 'M'];
export const listaSistemasMedidas: Array<string> = ['METRICO', 'IMPERIAL'];
export const listaPerfisAlimentares: Array<string> = ['ONIVORO', 'VEGETARIANO', 'VEGANO'];
