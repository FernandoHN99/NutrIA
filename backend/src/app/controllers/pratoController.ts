import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import PratoService from '../services/pratoService';

export default class PratoController{
   private pratoSerivce: PratoService;

   constructor(){
      this.pratoSerivce = new PratoService();
   }

   public async obterDiasUsuario(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const retornoPratos = await this.pratoSerivce.obterPratosUsuario(req.body.id_usuario);
      return new JsonReponseSucesso(200, 'Pratos retornados com sucesso', retornoPratos);
   }

}