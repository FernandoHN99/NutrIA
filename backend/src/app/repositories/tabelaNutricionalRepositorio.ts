import TabelaNutricional from "../entities/tabelaNutricional";
import { AppDataSource } from '../../database/data-source';

export default class TabelaNutricionalRepositorio {

   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(TabelaNutricional);
   }

   public async pegarTabelaPorId(tabelaID: number): Promise<TabelaNutricional | null> {
      return await this.repositorio.findOne({
          where: {
              id_tabela_nutricional: tabelaID,
          },
          relations: ['alimento']
      });
  }
  

}