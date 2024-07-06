import AlimentoFavorito from "../entities/alimentoFavorito";
import AlimentoFavoritoRepositorio from "../repositories/alimentoFavoritoRepositorio";
import { salvarAlimentoFavoritoObject } from "../schemas/alimentoFavorito/salvarAlimentoFavoritoSchema";
import { JsonReponseErro } from "../../utils/jsonReponses";

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
      if(!alimentoFavorito){
         alimentoFavorito = new AlimentoFavorito(dadosSalvarAlimentoFavorito)
         return await alimentoFavorito.save()
      }
      await alimentoFavorito.remove();
      return {};
   }

}