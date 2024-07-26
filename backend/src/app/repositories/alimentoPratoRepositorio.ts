import AlimentoPrato from "../entities/alimentoPrato";
import { AppDataSource } from '../../database/data-source';

export default class AlimentoPratoRepositorio {

   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(AlimentoPrato);
   }

   public getRepositorio(): any {
      return this.repositorio;
   }
}