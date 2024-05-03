import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import validate  from 'uuid-validate'
import DiaService from '../services/diaService';

export default class DiaController{
   private diaService: DiaService;

   constructor(){
      this.diaService = new DiaService();
   }

   public async obterDiasUsuario(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const usuarioID: string = req.params.id_usuario;
      if(!validate(usuarioID)){
         JsonReponseErro.lancar(400, 'ID do usuário inválido');
      }
      const retornoDias = await this.diaService.pegarDiasUsuario(usuarioID);
      return new JsonReponseSucesso(200, 'Dias retornados com sucesso', retornoDias);
   }

}