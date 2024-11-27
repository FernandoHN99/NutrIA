import { AppDataSource } from '../../database/data-source';
import AlimentoFavorito from '../entities/alimentoFavorito';

export default class AlimentoFavoritoRepositorio {

   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(AlimentoFavorito);
   }

   public async obterAlimentoFavoritoUsuario(usuarioID: string, alimentoID: number): Promise<AlimentoFavorito | null> {
      return await this.repositorio.createQueryBuilder('af')
         .select([
            'af',
            'a',
            'tb',
         ])
         .innerJoin('af.alimento', 'a')
         .innerJoin('a.tabelasNutricionais', 'tb')
         .where('af.id_usuario = :usuarioID', { usuarioID })
         .andWhere('af.id_alimento = :alimentoID', { alimentoID })
         .getOne();
   }


   public async obterAlimentosFavoritosUsuario(usuarioID: string): Promise<any[]> {
      return await this.repositorio.createQueryBuilder('af')
         .select([
            'af.dtt_alimento_favoritado',
            'a',
            'tb'
         ])
         .innerJoin('af.alimento', 'a')
         .innerJoin('a.tabelasNutricionais', 'tb')
         .where('af.id_usuario = :usuarioID', { usuarioID })
         .orderBy('af.dtt_alimento_favoritado', 'ASC')
         .orderBy('a.nome_alimento', 'ASC')
         .getMany();
   }

}