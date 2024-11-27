
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
            dt_criacao_perfil: 'ASC' 
         } 
      });
   }
   
   public async obterPerfilPorID(perfilID: number): Promise<Perfil> {
      return await this.repositorio.findOne({ 
         where: { 
            id_perfil: perfilID 
         } 
      });
   }

   public async obterPerfilUnique(usuarioID: string, dtCriacao: string): Promise<Perfil> {
      return await this.repositorio.findOne({ 
         where: { 
            id_usuario: usuarioID,
            dt_criacao_perfil: dtCriacao
         }
      });
   }

}