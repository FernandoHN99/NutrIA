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

   public async pegarAlimentoPratoUsuarioPorID(alimentoPratoID: number, usuarioID: string): Promise<AlimentoPrato | null> {
      return await this.repositorio.findOne({
         where: {
            id_alimento_prato: alimentoPratoID,
            prato: {
               id_usuario: usuarioID
            }
         }
      });
   }

   public async pegarAlimentosPratoUsuarioPorPratoID(pratoID: number, usuarioID: string): Promise<AlimentoPrato[]> {
      return await this.repositorio.find({
         where: {
            id_prato: pratoID,
            prato: {
               id_usuario: usuarioID
            }
         }
      });
   }
}