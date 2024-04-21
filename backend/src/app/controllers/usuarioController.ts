import { Request, Response } from 'express';
import UsuarioRepositorio from '../repositories/usuarioRepositorio';
import UsuarioService from '../services/usuarioService';
import Controller from './controller';

export default class UsuarioController implements Controller{

   private usuarioRepo: UsuarioRepositorio;
   private usuarioService: UsuarioService;

   constructor() {
      this.usuarioService = new UsuarioService();
      this.usuarioRepo = new UsuarioRepositorio();
   }

   public async obterUsuario(req: Request, res: Response, next: any) {
      try {
         // const usuarioID: string = req.params.id;
         const usuarioID: string = 'a60fdf7b-c7f4-4778-b022-7c71040290c'
         let retornoUsuario: any = await this.usuarioRepo.obterUsuarioPorID(usuarioID);
         // let retornoUsuario: any = await this.usuarioRepo.obterUsuarios();
         res.status(200).json({ message: retornoUsuario });
      }catch(erro) {
         res.status(501).json({ Error: erro });
      }
  }

  public async obterUsuarios(req: Request, res: Response) {
   try {
      let retornoUsuarios: any = await this.usuarioRepo.obterUsuarios();
      res.status(200).json({ message: retornoUsuarios });

   }catch(erro) {
      res.status(500).json({ Error: erro });
   }
}
   
}
