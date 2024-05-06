import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import validate  from 'uuid-validate'
import AlimentoService from '../services/alimentoService';

export default class DiaController{
   private alimentoService: AlimentoService;

   constructor(){
      this.alimentoService = new AlimentoService();
   }

   public async obterAlimentos(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const usuarioID: string = req.params.id_usuario;
      if(!validate(usuarioID)){
         JsonReponseErro.lancar(400, 'ID do usuário inválido');
      }
      const retornoRefeicoes = await this.alimentoService.obterAlimentos();
      return new JsonReponseSucesso(200, 'Refeicoes retornados com sucesso', retornoRefeicoes);
   }
   
}