import 'dotenv/config';

export const PORTA_BACKEND: number = 5001;
export const DOMINIO_BACKEND: string = 'http://127.0.0.1';

export const USUARIO: string = process.env.DB_USUARIO ?? '';
export const HOST: string = process.env.DB_HOST ?? '';
export const DATABASE: string = process.env.DB_DATABASE ?? '';
export const SENHA: string = process.env.DB_SENHA ?? '';
export const PORTA_DB: number | undefined = process.env.DB_PORTA ? 
                                       parseInt(process.env.DB_PORTA) : 
                                       undefined;
