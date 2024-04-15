import express, { Request, Response } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import { configurarRotas } from './rotas/indexRotas';
import { Portas } from './utils/enums';
import 'dotenv/config';

class Servidor {
   private app: express.Application;
   private porta: number;
   private chave_secreta: string;
   private nutriaRoteador: express.Router;

   constructor(porta: number, chave_secreta: string) {
      this.app = express();
      this.porta = porta;
      this.chave_secreta = chave_secreta;
      this.nutriaRoteador = express.Router({ 
                                    caseSensitive: true, 
                                    mergeParams: true 
                                 });

      this.configurarMiddlewares();
      this.ativarRotas();
   }

   private configurarMiddlewares(): void {
      this.app.use(cookieParser());
      this.app.use(cors());
      this.app.use(
         session({
            secret: this.chave_secreta,
            resave: false,
            saveUninitialized: false,
         })
      );
      this.app.use(bodyParser.json());
   }

   private ativarRotas(): void {
      configurarRotas(this.nutriaRoteador);
      this.app.use('/nutria', this.nutriaRoteador);
   }

   public iniciar(): void {
      this.app.listen(this.porta, () => {
         console.log(`Servidor ativo. Porta: ${this.porta}`);
      });
   }
}

const porta: Portas = Portas.PORTA_BACKEND;
const chave_secreta: string = process.env.CHAVE_SECRETA || '';
const servidor: Servidor = new Servidor(porta, chave_secreta);
servidor.iniciar();
