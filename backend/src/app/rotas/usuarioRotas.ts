// routes/UserRoutes.ts
import { Router, Request, Response, NextFunction } from 'express';
import Rota from './rota';
import UsuarioController from '../controllers/usuarioController';
import Util from '../../utils/util';

export default class UsuarioRotas implements Rota {
   public caminho: string = '/usuario';
   public roteador: Router;
   public controller: UsuarioController;

   constructor() {
      this.roteador = Router()
      this.controller = new UsuarioController();

      this.roteador.get('/criar-usuario', Util.envolveFuncTryCatch(this.controller, this.controller.criarUsuario));    
      this.roteador.get('/:id', Util.envolveFuncTryCatch(this.controller, this.controller.obterUsuarioPorID));    

      console.log('Rotas Usuário: Ativo');
   }

}

