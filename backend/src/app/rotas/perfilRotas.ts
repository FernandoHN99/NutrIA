import { Router, Request, Response, NextFunction } from 'express';
import Rota from '../../utils/rota';
import Util from '../../utils/util';
import PerfilController from '../controllers/perfilController';

export default class PerfilRotas implements Rota {
   public caminho: string = '/perfil';
   public roteador: Router;
   public controller: PerfilController;

   constructor() {
      this.roteador = Router()
      this.controller = new PerfilController();

      this.roteador.get('/usuario', Util.envolveFuncTryCatch(this.controller, this.controller.obterPerfisUsuario));

      console.log('Rotas Perfil: Ativo');
   }
   
}

