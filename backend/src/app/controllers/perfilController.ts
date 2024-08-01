import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import PerfilService from '../services/perfilService';

export default class PerfilController{
   private perfilService: PerfilService;

   constructor(){
      this.perfilService = new PerfilService();
   }

   public async obterPerfisUsuario(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const retornoPerfis = await this.perfilService.obterPerfisUsuario(req.body.id_usuario);
      return new JsonReponseSucesso(200, 'Perfis retornados com sucesso', retornoPerfis);
   }

}