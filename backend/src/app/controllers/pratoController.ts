import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import PratoService from '../services/pratoService';
import { criarPratoSchema } from '../schemas/prato/criarPratoSchema';


export default class PratoController{
   private pratoSerivce: PratoService;

   constructor(){
      this.pratoSerivce = new PratoService();
   }

   public async obterDiasUsuario(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const retornoPratos = await this.pratoSerivce.obterPratosUsuario(req.body.id_usuario);
      return new JsonReponseSucesso(200, 'Pratos retornados com sucesso', retornoPratos);
   }

   public async criarPrato(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = criarPratoSchema.safeParse(req.body);
      if(!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      const retornoPrato = await this.pratoSerivce.criarPrato(resultadoParse.data);
      return new JsonReponseSucesso(200, 'Prato criado com sucesso', retornoPrato);

   }

}