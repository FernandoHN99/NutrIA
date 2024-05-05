import Dia from '../entities/dia';
import { AppDataSource } from '../../database/data-source';

export default class DiaRepositorio {

   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(Dia);
   }

   public async obterDiasUsuario(usuarioID: string): Promise<Dia[]> {
      return await this.repositorio.find({ where: { id_usuario: usuarioID }});
   }

   public async pegarDiaUsuario(usuarioID: string, dtDia: string): Promise<Dia | null> {
      return await this.repositorio.findOne({ where: { id_usuario: usuarioID , dt_dia: dtDia}});
   }

}