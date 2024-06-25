import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import validate  from 'uuid-validate'
import RefeicaoService from '../services/refeicaoService';
import { criarRefeicaoSchema } from '../schemas/refeicao/criarRefeicaoSchema';
import { atualizarRefeicaoSchema } from '../schemas/refeicao/atualizarRefeicaoSchema';

export default class DiaController{
   private refeicaoService: RefeicaoService;

   constructor(){
      this.refeicaoService = new RefeicaoService();
   }

   public async obterRefeicoesUsuario(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const usuarioID: string = req.body.id_usuario;
      if(!validate(usuarioID)){
         JsonReponseErro.lancar(400, 'ID do usuário inválido');
      }
      const retornoRefeicoes = await this.refeicaoService.obterRefeicoesUsuario(usuarioID);
      return new JsonReponseSucesso(200, 'Refeicoes retornados com sucesso', retornoRefeicoes);
   }

   public async criarRefeicao(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = criarRefeicaoSchema.safeParse(req.body);
      if(!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      const retornoCriarRefeicao = await this.refeicaoService.criarRefeicao(resultadoParse.data);
      return new JsonReponseSucesso(201, 'Refeicao criada com sucesso', retornoCriarRefeicao);
   }

   public async atualizarRefeicao(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = atualizarRefeicaoSchema.safeParse(req.body);
      if(!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      const retornoAtualizarRefeicao = await this.refeicaoService.atualizarRefeicao(resultadoParse.data);
      return new JsonReponseSucesso(200, 'Refeicao atualizada com sucesso', retornoAtualizarRefeicao);
   }
   
}