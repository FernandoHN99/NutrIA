import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import AlimentoPratoService from '../services/alimentoPratoService';
import { deletarAlimentoPratoSchema } from '../schemas/alimentoPrato/deletarAlimentoPratoSchema';

export default class AlimentoPratoController{
   private alimentoPratoSerivce: AlimentoPratoService;

   constructor(){
      this.alimentoPratoSerivce = new AlimentoPratoService();
   }

   public async deletarAlimentoPrato(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = deletarAlimentoPratoSchema.safeParse(req.body);
      if(!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      const retornoPratoDeletado = await this.alimentoPratoSerivce.deletarAlimentoPrato(resultadoParse.data);
      return new JsonReponseSucesso(200, 'Prato deletado com sucesso', retornoPratoDeletado);
   }

}