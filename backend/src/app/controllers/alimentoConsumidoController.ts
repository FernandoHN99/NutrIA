import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import AlimentoConsumidoService from '../services/alimentoConsumidoService';
import validate  from 'uuid-validate'


export default class AlimentoConsumidoController{
   private alimentoConsumidoService: AlimentoConsumidoService;

   constructor(){
      this.alimentoConsumidoService = new AlimentoConsumidoService();
   }

   public async obterConsumoUsuario(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const usuarioID: string = req.params.usuarioID;
      if(!validate(usuarioID)){
         JsonReponseErro.lancar(400, 'ID do usuário inválido');
      }
      const retornoConsumoUsuario = await this.alimentoConsumidoService.obterConsumoUsuario(usuarioID);
      return new JsonReponseSucesso(200, 'Consumo do usuário retornado com sucesso', retornoConsumoUsuario);
   }
}