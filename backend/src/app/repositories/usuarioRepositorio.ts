import Usuario from '../entities/usuario';
import { AppDataSource } from '../../database/data-source';

export default class UsuarioRepositorio {

   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(Usuario);
   }

   public async obterUsuarioPorID(usuarioID: string): Promise<Usuario | null> {
      return await this.repositorio.findOne({ where: { id_usuario : usuarioID } });
   }

   public async criarUsuario(novoUsuario:Usuario): Promise<Usuario> {
      return await this.repositorio.insert(novoUsuario);
   }

   public getRepositorio(): any {
      return this.repositorio;
   }

}