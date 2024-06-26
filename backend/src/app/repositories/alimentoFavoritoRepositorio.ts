import { AppDataSource } from '../../database/data-source';
import AlimentoFavorito from '../entities/alimentoFavorito';

export default class AlimentoFavoritoRepositorio {

   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(AlimentoFavorito);
   }

   public async obterAlimentoFavorito(usuarioID: string, alimentoID: number): Promise<AlimentoFavorito | null> {
      return await this.repositorio.findOne({ where: { id_usuario : usuarioID, id_alimento: alimentoID } });
   }

   public async obterAlimentosFavoritosUsuario(usuarioID: string): Promise<AlimentoFavorito[]> {
      return await this.repositorio.find({
         where: {
            id_usuario: usuarioID
         },
         order: {
            dtt_alimento_favoritado: 'ASC'
         },
      });
   }

}