
import Prato from "../entities/prato";
import { AppDataSource } from '../../database/data-source';

export default class PratoRepositorio {

   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(Prato);
   }

   public async obterPratosUsuario(usuarioID: string): Promise<Prato[] | null> {
      return await this.repositorio.find({ 
         where: { 
            id_usuario: usuarioID 
         }, 
         order: {
            nome_prato: 'ASC'
         } 
      });
   }



}