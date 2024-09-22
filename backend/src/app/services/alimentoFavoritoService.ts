import AlimentoFavorito from "../entities/alimentoFavorito";
import AlimentoFavoritoRepositorio from "../repositories/alimentoFavoritoRepositorio";
import { salvarAlimentoFavoritoObject } from "../schemas/alimentoFavorito/salvarAlimentoFavoritoSchema";

export default class AlimentoFavoritoService{
   
   private alimentoFavoritoRepo: AlimentoFavoritoRepositorio;

   constructor(){
      this.alimentoFavoritoRepo = new AlimentoFavoritoRepositorio()
   }

   public async obterAlimentosFavoritosUsuario(usuarioID: string): Promise<AlimentoFavorito[]>{
      return await this.alimentoFavoritoRepo.obterAlimentosFavoritosUsuario(usuarioID);
   }

   public async atualizarAlimentoFavorito(dadosSalvarAlimentoFavorito: salvarAlimentoFavoritoObject): Promise<AlimentoFavorito | {}>{
      let alimentoFavorito = await this.alimentoFavoritoRepo.obterAlimentoFavoritoUsuario(
         dadosSalvarAlimentoFavorito.id_usuario, 
         dadosSalvarAlimentoFavorito.id_alimento
      );
      // const alimentoFavoritoBackup = alimentoFavorito;
      if(!alimentoFavorito){
         alimentoFavorito = new AlimentoFavorito(dadosSalvarAlimentoFavorito)
         await alimentoFavorito.save();
         alimentoFavorito = await this.alimentoFavoritoRepo.obterAlimentoFavoritoUsuario(
            dadosSalvarAlimentoFavorito.id_usuario, 
            dadosSalvarAlimentoFavorito.id_alimento
         );
         return alimentoFavorito!;
      }
      await alimentoFavorito.remove();
      return {...alimentoFavorito, dtt_alimento_favoritado: null};
   }
}