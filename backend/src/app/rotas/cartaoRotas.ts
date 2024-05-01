// routes/UserRoutes.ts
import { Router, Request, Response, NextFunction } from 'express';
import Rota from '../../utils/rota';
import CartaoController from '../controllers/cartaoController';
import Util from '../../utils/util';

export default class UsuarioRotas implements Rota {
   public caminho: string = '/cartao';
   public roteador: Router;
   public controller: CartaoController;

   constructor() {
      this.roteador = Router()
      this.controller = new CartaoController();

      this.roteador.get('/:id_usuario', Util.envolveFuncTryCatch(this.controller, this.controller.obterCartoesUsuario));
      this.roteador.get('/criar/:id_usuario', Util.envolveFuncTryCatch(this.controller, this.controller.obterCartoesUsuario));
      console.log('Rotas Cartao: Ativo');
   }
}

