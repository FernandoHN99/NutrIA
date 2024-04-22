import UsuarioRepositorio from '../repositories/usuarioRepositorio';
import { criarUsuarioOutputDTO } from '../schemas/criarUsuarioSchema';
import Usuario from '../entities/usuario';

export default class UsuarioService{

   private usuarioRepo: UsuarioRepositorio;

   constructor() {
      this.usuarioRepo = new UsuarioRepositorio();
   }

   public async obterUsuarioPorID(usuarioID: string): Promise<Usuario | null> {
      return await this.usuarioRepo.obterUsuarioPorID(usuarioID);
   }
   
   public async criarUsuario(criarUsuarioJSON: criarUsuarioOutputDTO) {
      let novoUsuario: Usuario = new Usuario(criarUsuarioJSON);
      return await this.usuarioRepo.criarUsuario(novoUsuario);
   }
}
