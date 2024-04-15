// routes/UserRoutes.ts
import express, { Router } from 'express';
import Rota from './rota';
import UsuarioController from '../controllers/usuarioController';

export default class UsuarioRotas implements Rota<UsuarioController> {
   public roteador: express.Router;
   public controller: UsuarioController;

   constructor() {
      this.roteador = express.Router();
      this.controller = new UsuarioController();
      this.criarRotas();
   }

   public criarRotas(): void {
      this.criarRota('/', this.controller.obterUsuario);
   }

   private criarRota(path: string, controllerMethod: (...args: any[]) => Promise<void>): void {
      this.roteador.get(path, async (req, res, next) => {
         await controllerMethod.call(this.controller, req, res);
      });
   }
   
}
