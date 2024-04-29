import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Rota from '../utils/rota';
import 'dotenv/config';
import { AppDataSource } from '../database/data-source';


export default class Servidor {
   private app: express.Application;
   private porta: number;
   private listaSubRotas: Rota[];
   private roteadorServidor: express.Router;

   constructor(porta: number, listaSubRotas:Rota[]) {
      this.app = express();
      this.porta = porta;
      this.listaSubRotas = listaSubRotas;
      this.roteadorServidor = express.Router({ caseSensitive: true });
      this.app.set('case sensitive routing', true);
      this.configurarMiddlewares();
   }

   private configurarMiddlewares(): void {
      this.app.use((req:Request, res:Response, next:NextFunction) => {
         console.log(`${req.method} ${req.url}`);
         next();
      });

      this.app.use(cookieParser());
      this.app.use(cors());
      this.app.use(express.json());
   }

   private ativarRotas(): void {
      this.ativarSubRotas();
      this.app.use('/nutria', this.roteadorServidor);
   }
   
   private ativarSubRotas() {
      this.listaSubRotas.forEach(rota => {
         this.roteadorServidor.use(rota.caminho, rota.roteador);
      });
   }

   private iniciarServicos(): void {
      AppDataSource.initialize().then(async () => {
         console.log('Banco de dados: Ativo');
         this.app.listen(this.porta, () => {
            console.log(`Servidor: Ativo em Porta: ${this.porta}`);
         });
      }).catch((erro) => {
         console.error('Erro ao conectar ao banco de dados', erro);
      });
   }

   public iniciar(): void {
      this.ativarRotas();
      this.iniciarServicos();
   }
}

