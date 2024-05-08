import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import { buscarAlimentosSchema } from '../schemas/alimento/buscarAlimentoSchema';
import AlimentoService from '../services/alimentoService';

export default class DiaController{
   private alimentoService: AlimentoService;

   constructor(){
      this.alimentoService = new AlimentoService();
   }

   public async obterAlimentos(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = buscarAlimentosSchema.safeParse(req.query); 
      if (!resultadoParse.success){
         JsonReponseErro.lancar(400, 'Parametros inválidos', resultadoParse.error);
      };
      const retornoAlimentos = await this.alimentoService.obterAlimentos(resultadoParse.data);
      return new JsonReponseSucesso(200, 'Alimentos retornados com sucesso', retornoAlimentos);
   }
   
}