import { Router, Request, Response, NextFunction } from 'express';
import Rota from '../../utils/rota';
import CartaoController from '../controllers/cartaoController';
import Util from '../../utils/util';

export default class CartaoRotas implements Rota {
   public caminho: string = '/cartao';
   public roteador: Router;
   public controller: CartaoController;

   constructor() {
      this.roteador = Router()
      this.controller = new CartaoController();

      this.roteador.get('/usuario', Util.envolveFuncTryCatch(this.controller, this.controller.obterCartoesUsuario));
      this.roteador.patch('/atualizar', Util.envolveFuncTryCatch(this.controller, this.controller.marcarCartaoLido));

      console.log('Rotas Cartao: Ativo');
   }
   
}

