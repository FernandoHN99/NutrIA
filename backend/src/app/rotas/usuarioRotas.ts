// routes/UserRoutes.ts
import { Router, Request, Response, NextFunction } from 'express';
import Rota from '../../utils/rota';
import UsuarioController from '../controllers/usuarioController';
import Util from '../../utils/util';

export default class UsuarioRotas implements Rota {
   public caminho: string = '/usuario';
   public roteador: Router;
   public controller: UsuarioController;

   constructor() {
      this.roteador = Router()
      this.controller = new UsuarioController();

      this.roteador.patch('/atualizar/conta', Util.envolveFuncTryCatch(this.controller, this.controller.atualizarUsuarioConta));    
      this.roteador.patch('/atualizar/dados', Util.envolveFuncTryCatch(this.controller, this.controller.atualizarUsuarioDados));    
      this.roteador.post('/criar', Util.envolveFuncTryCatch(this.controller, this.controller.criarUsuario));    
      this.roteador.post('/login', Util.envolveFuncTryCatch(this.controller, this.controller.fazerLogin));
      this.roteador.get('/:id', Util.envolveFuncTryCatch(this.controller, this.controller.obterUsuarioPorID));    
      this.roteador.get('/', Util.envolveFuncTryCatch(this.controller, this.controller.obterTodosUsuarios));
      
      
      console.log('Rotas Usuário: Ativo');
   }
}

