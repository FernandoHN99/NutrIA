import { Router, Request, Response, NextFunction } from 'express';
import Rota from '../../utils/rota';
import PratoController from '../controllers/pratoController';
import Util from '../../utils/util';

export default class PratoRotas implements Rota {
   public caminho: string = '/prato';
   public roteador: Router;
   public controller: PratoController;

   constructor() {
      this.roteador = Router()
      this.controller = new PratoController();

      this.roteador.get('/usuario', Util.envolveFuncTryCatch(this.controller, this.controller.obterPratosUsuario));
      this.roteador.post('/criar', Util.envolveFuncTryCatch(this.controller, this.controller.criarPrato));
      this.roteador.patch('/atualizar', Util.envolveFuncTryCatch(this.controller, this.controller.atualizarPrato));

      console.log('Rotas Prato: Ativo');
   }
   
}

