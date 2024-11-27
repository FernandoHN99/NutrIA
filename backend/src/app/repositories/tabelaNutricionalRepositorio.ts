import TabelaNutricional from "../entities/tabelaNutricional";
import { AppDataSource } from '../../database/data-source';

export default class TabelaNutricionalRepositorio {

   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(TabelaNutricional);
   }

   public async pegarTabelaUsuarioPorId(tabelaID: number, usuarioID: string): Promise<TabelaNutricional | null> {
      return await this.repositorio.findOne({
         where: {
            id_tabela_nutricional: tabelaID,
            alimento: {
               id_usuario: usuarioID
            }
         },
         relations: ['alimento']
      });
   }

   public async pegarTabelasUsuarioPorIdAlimento(alimentoID: number, usuarioID: string): Promise<TabelaNutricional[]> {
      return await this.repositorio.find({
         where: {
            id_alimento: alimentoID,
            alimento: {
               id_usuario: usuarioID
            }
         },
         relations: ['alimento']
      });
   }

}