import { Router, Request, Response, NextFunction } from 'express';
import Rota from '../../utils/rota';
import AlimentoPratoController from '../controllers/alimentoPratoController';
import Util from '../../utils/util';

export default class AlimentoPratoRotas implements Rota {
   public caminho: string = '/alimento-prato';
   public roteador: Router;
   public controller: AlimentoPratoController;

   constructor() {
      this.roteador = Router()
      this.controller = new AlimentoPratoController();

      this.roteador.delete('/deletar', Util.envolveFuncTryCatch(this.controller, this.controller.deletarAlimentoPrato));

      console.log('Rotas Prato: Ativo');
   }
   
}

