import Alimento from '../entities/alimento';
import { AppDataSource } from '../../database/data-source';

export default class AlimentoRepositorio {

   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(Alimento);
   }

   public async obterAlimentos(): Promise<Alimento[]> {
      return await this.repositorio.find();
   }

}