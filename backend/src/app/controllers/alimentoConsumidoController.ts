import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import AlimentoConsumidoService from '../services/alimentoConsumidoService';
import { buscarAlimentosConsumidosSchema } from '../schemas/alimentoConsumido/buscarAlimentosConsumidosSchema';
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
      const resultadoParse: any = buscarAlimentosConsumidosSchema.safeParse(req.query)
      if (!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      }
      const retornoConsumoUsuario = await this.alimentoConsumidoService.obterConsumoUsuario(usuarioID, resultadoParse.data);
      return new JsonReponseSucesso(200, 'Consumo do usuário retornado com sucesso', retornoConsumoUsuario);
   }
}