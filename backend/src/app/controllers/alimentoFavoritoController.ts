import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import AlimentoFavoritoService from '../services/alimentoFavoritoService';
import { salvarAlimentoFavoritoSchema } from '../schemas/alimentoFavorito/salvarAlimentoFavoritoSchema';
import Util from '../../utils/util';

export default class AlimentoFavoritoController{
   private alimentoFavoritoService: AlimentoFavoritoService;

   constructor(){
      this.alimentoFavoritoService = new AlimentoFavoritoService();
   }

   public async obterAlimentosFavoritosUsuario(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const retornoAlimentosFavoritos = await this.alimentoFavoritoService.obterAlimentosFavoritosUsuario(req.body.id_usuario);
      return new JsonReponseSucesso(200, 'Alimentos favoritos retornados com sucesso', retornoAlimentosFavoritos);
   }

   public async atualizarAlimentoFavorito(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = salvarAlimentoFavoritoSchema.safeParse(req.body)
      if (!resultadoParse.success) {
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      }
      const retornoAlimentosFavoritos = await this.alimentoFavoritoService.atualizarAlimentoFavorito(resultadoParse.data);
      return new JsonReponseSucesso(200, 'Alimento favorito atualizado com sucesso', retornoAlimentosFavoritos);

   }
   
}