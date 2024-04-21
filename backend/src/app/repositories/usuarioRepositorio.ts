import Usuario from '../entities/usuario';
import IUsuario from '../interfaces/IUsuario';
import { AppDataSource } from '../../database/data-source';

export default class UsuarioRepositorio {

   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(Usuario);
   }

   public async obterUsuarioPorID(usuarioID: string): Promise<IUsuario | null> {
      return this.repositorio.findOne({ where: { id_usuario : usuarioID } });
   }

   public async obterUsuarios(): Promise<IUsuario[]> {
      return this.repositorio.find();
   }


   public getRepositorio(): any {
      return this.repositorio;
   }

}