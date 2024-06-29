import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import TabelaNutricionalService from '../services/tabelaNutricionalService';
import { criarTabelaNutricionalSchema } from '../schemas/tabelaNutricional/criarTabelaNutricionalSchema';
import { atualizarTabelaNutricionalSchema } from '../schemas/tabelaNutricional/atualizarTabelaNutricionalSchema';

export default class TabelaNutricionalController{
   private alimentoService: TabelaNutricionalService;

   constructor(){
      this.alimentoService = new TabelaNutricionalService();
   }

   public async criarTabelaNutricional(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = criarTabelaNutricionalSchema.safeParse(req.body);
      if(!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      const retornoCriacaoTabela = await this.alimentoService.criarTabelaNutrcional(resultadoParse.data);
      return new JsonReponseSucesso(201, 'Tabela nutricional criada com sucesso', retornoCriacaoTabela);
   }

   public async atualizarTabelaNutricional(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = atualizarTabelaNutricionalSchema.safeParse(req.body);
      if(!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      const retornoAtualizacaoTabela = await this.alimentoService.atualizarTabelaNutricional(resultadoParse.data);
      return new JsonReponseSucesso(201, 'Alimento atualizado com sucesso', {retornoAtualizacaoTabela});
   }
   
}