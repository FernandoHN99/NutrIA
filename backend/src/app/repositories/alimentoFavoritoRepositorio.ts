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

   public async obterAlimentosFavoritosUsuario(usuarioID: string): Promise<any[]> {
      return await this.repositorio.createQueryBuilder('af')
         .select([
            'af.id_usuario',
            'af.dtt_alimento_favoritado',
            'a',
         ])
         .innerJoin('af.alimento', 'a')
         .where('af.id_usuario = :usuarioID', { usuarioID })
         .orderBy('af.dtt_alimento_favoritado', 'ASC')
         .orderBy('a.nome_alimento', 'ASC')
         .getMany();
   }

}