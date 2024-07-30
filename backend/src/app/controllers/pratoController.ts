import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import PratoService from '../services/pratoService';
import { criarPratoCompletoSchema } from '../schemas/prato/criarPratoCompletoSchema';
import { atualizarPratoCompletoSchema } from '../schemas/prato/atualizarPratoCompletoSchema';

export default class PratoController{
   private pratoSerivce: PratoService;

   constructor(){
      this.pratoSerivce = new PratoService();
   }

   public async obterPratosUsuario(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const retornoPratos = await this.pratoSerivce.obterPratosUsuario(req.body.id_usuario);
      return new JsonReponseSucesso(200, 'Pratos retornados com sucesso', retornoPratos);
   }

   public async criarPrato(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = criarPratoCompletoSchema.safeParse(req.body);
      if(!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      const retornoPrato = await this.pratoSerivce.criarPrato(resultadoParse.data);
      return new JsonReponseSucesso(200, 'Prato criado com sucesso', retornoPrato);
   }

   public async atualizarPrato(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = atualizarPratoCompletoSchema.safeParse(req.body);
      if(!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      const retornoPrato = await this.pratoSerivce.atualizarPrato(resultadoParse.data);
      return new JsonReponseSucesso(200, 'Prato atualizado com sucesso', retornoPrato);
   }

}