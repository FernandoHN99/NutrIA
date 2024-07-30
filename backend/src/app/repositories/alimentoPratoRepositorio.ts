import AlimentoPrato from "../entities/alimentoPrato";
import { AppDataSource } from '../../database/data-source';

export default class AlimentoPratoRepositorio {

   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(AlimentoPrato);
   }

   public async inserirAlimentosPrato(listaAlimentosPrato: AlimentoPrato[]): Promise <AlimentoPrato[]> {
      return await this.repositorio.save(listaAlimentosPrato);
   }

   public async pegarAlimentoPratoPorID(alimentoPratoID: number, pratoID: number): Promise<AlimentoPrato | null> {
      return await this.repositorio.findOne({
         where: {
            id_alimento_prato: alimentoPratoID,
            id_prato: pratoID
         }
      });
   }
}