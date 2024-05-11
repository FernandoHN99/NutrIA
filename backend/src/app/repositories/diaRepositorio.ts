import Dia from '../entities/dia';
import { AppDataSource } from '../../database/data-source';
import Usuario from '../entities/usuario';

export default class DiaRepositorio {

   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(Dia);
   }

   public async obterDiasUsuario(usuarioID: string): Promise<Dia[]> {
      return await this.repositorio.find({ where: { id_usuario: usuarioID }, order: { dt_dia: "ASC" }});
   }
   public async obterDiaUsuario(usuarioID: string, dtDia: string): Promise<Dia | null> {
      // fazer um join do usuario junto com o dia
      return await this.repositorio.findOne({
         where: { 
            id_usuario: usuarioID, 
            dt_dia: dtDia 
         }
      });
   }

}