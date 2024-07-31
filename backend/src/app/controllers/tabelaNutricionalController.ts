import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import TabelaNutricionalService from '../services/tabelaNutricionalService';
import { criarNovaTabelaNutricionalSchema } from '../schemas/tabelaNutricional/criarNovaTabelaNutricionalSchema';
import { atualizarTabelaNutricionalSchema } from '../schemas/tabelaNutricional/atualizarTabelaNutricionalSchema';
import { deletarTabelaNutricionalSchema } from '../schemas/tabelaNutricional/deletarTabelaNutricionalSchema';

export default class TabelaNutricionalController{
   private tabelaNutricionalService: TabelaNutricionalService;

   constructor(){
      this.tabelaNutricionalService = new TabelaNutricionalService();
   }

   public async criarNovaTabelaNutricional(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = criarNovaTabelaNutricionalSchema.safeParse(req.body);
      if(!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      const retornoCriacaoTabela = await this.tabelaNutricionalService.criarNovaTabelaNutricional(resultadoParse.data);
      return new JsonReponseSucesso(201, 'Tabela nutricional criada com sucesso', retornoCriacaoTabela);
   }

   public async atualizarTabelaNutricional(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = atualizarTabelaNutricionalSchema.safeParse(req.body);
      if(!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      const retornoAtualizacaoTabela = await this.tabelaNutricionalService.atualizarTabelaNutricional(resultadoParse.data);
      return new JsonReponseSucesso(201, 'Alimento atualizado com sucesso', retornoAtualizacaoTabela );
   }

   public async deletarTabelaNutricional(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = deletarTabelaNutricionalSchema.safeParse(req.body);
      if(!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      const retornoDeletarTabela = await this.tabelaNutricionalService.deletarTabelaNutricional(resultadoParse.data);
      return new JsonReponseSucesso(200, 'Tabela nutricional deletada com sucesso', retornoDeletarTabela);
   }

   
}