import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import DiaService from '../services/diaService';
import { salvarDiaSchema } from '../schemas/dia/salvarDiaSchema';
import { deletarDiaSchema } from '../schemas/dia/deletarDiaSchema';

export default class DiaController{
   private diaService: DiaService;

   constructor(){
      this.diaService = new DiaService();
   }

   public async obterDiasUsuario(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const retornoDias = await this.diaService.obterDiasUsuario(req.body.id_usuario);
      return new JsonReponseSucesso(200, 'Dias retornados com sucesso', retornoDias);
   }

   public async salvarDia(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = salvarDiaSchema.safeParse(req.body); 
      if (!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      const novoDia = await this.diaService.salvarDia(resultadoParse.data);
      return new JsonReponseSucesso(200, 'Dia salvo com sucesso', novoDia);
   }

   public async removerDia(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = deletarDiaSchema.safeParse(req.body); 
      if (!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      await this.diaService.removerDia(resultadoParse.data);
      return new JsonReponseSucesso(200, 'Dia removido com sucesso');
   }

}