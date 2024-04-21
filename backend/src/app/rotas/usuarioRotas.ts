// routes/UserRoutes.ts
import { Router, Request, Response, NextFunction } from 'express';
import Rota from './rota';
import UsuarioController from '../controllers/usuarioController';
import asyncHandler from 'express-async-handler';

export default class UsuarioRotas implements Rota {
   public caminho: string = '/usuario';
   public roteador: Router;
   public controller: UsuarioController;

   constructor() {
      this.roteador = Router()
      this.controller = new UsuarioController();

      this.roteador.get('/', this.controller.obterUsuario.bind(this.controller));      
      this.roteador.get('/usuarios', this.controller.obterUsuarios.bind(this.controller));
      console.log('Rotas Usuário: Ativo');
   }
   
}

