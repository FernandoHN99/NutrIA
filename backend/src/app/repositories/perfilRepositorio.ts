
import Perfil from "../entities/perfil";
import { AppDataSource } from '../../database/data-source';

export default class PerfilRepositorio {
   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(Perfil);
   }

   public async obterPerfisUsuario(usuarioID: string): Promise<Perfil[]> {
      return await this.repositorio.find({ 
         where: { 
            id_usuario: usuarioID 
         }, 
         order: { 
            dt_criacao_perfil: 'DESC' 
         } 
      });
   }

}