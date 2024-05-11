import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import { buscarAlimentosSchema } from '../schemas/alimento/buscarAlimentoSchema';
import { criarAlimentoSchema } from '../schemas/alimento/criarAlimentoSchema';
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


   //criacao de alimentos
   public async criarAlimento(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = criarAlimentoSchema.safeParse(req.body);
      if(!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      const retornoCriacaoAlimento = await this.alimentoService.criarAlimento(resultadoParse.data);
      return new JsonReponseSucesso(201, 'Alimento criado com sucesso', retornoCriacaoAlimento);
   }

   // atualizacao de alimentos
   

   // remocao de alimentos


   
}