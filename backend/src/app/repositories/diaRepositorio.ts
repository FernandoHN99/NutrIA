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

}