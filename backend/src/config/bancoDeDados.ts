import pgPromise, { IMain, IDatabase } from 'pg-promise';
import 'dotenv/config';

const bancoDadosConfig = {
   user: process.env.DB_USUARIO,
   host: process.env.DB_HOST,
   database: process.env.DB_DATABASE,
   password: process.env.DB_SENHA,
   port: process.env.DB_PORTA ? parseInt(process.env.DB_PORTA) : undefined
};

export default class BancoDeDados {
   private static instancia: BancoDeDados;
   private conexaoBD: IDatabase<any>;

   private constructor() {
      const postgrePromise: IMain = pgPromise();
      this.conexaoBD = postgrePromise(bancoDadosConfig);
   }

   public static obterInstancia(): BancoDeDados {
      if (!BancoDeDados.instancia) BancoDeDados.instancia = new BancoDeDados();
      return BancoDeDados.instancia;
   }
   
   public obterConexao(): IDatabase<any> {
      return this.conexaoBD;
   }
   
}
