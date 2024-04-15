import express from 'express';
import UsuarioDao from '../dao/usuarioDao';
import UsuarioService from '../services/usuarioService';
export default class UsuarioController{

   private usuarioDao: UsuarioDao = new UsuarioDao();
   private usuarioService: UsuarioService;

   constructor() {
      this.usuarioService = new UsuarioService();
   }

   public async obterUsuario(req: express.Request, res: express.Response) {
      try {
         // const usuarioID: string = req.params.id;
         const usuarioID: string = 'a60fdf7b-c7f4-4778-b022-7c71040290c1'
         let retornoUsuario: any = await this.usuarioDao.obterUsuarioPorID(usuarioID);
         res.status(200).json({ message: retornoUsuario });

      }catch {
         res.status(500).json({ message: 'Erro' });
      }
  }
   
}
