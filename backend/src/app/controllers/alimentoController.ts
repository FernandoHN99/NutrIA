import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import { buscarAlimentosSchema } from '../schemas/alimento/buscarAlimentosSchema';
import { atualizarAlimentoSchema } from '../schemas/alimento/atualizarAlimentoSchema';
import { criarAlimentoTabelaSchema } from '../schemas/alimento/criarAlimentoTabelaSchema ';
import AlimentoService from '../services/alimentoService';

export default class AlimentoController{
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

   public async obterAlimentosUsuario(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const retornoAlimentosUsuario = await this.alimentoService.obterAlimentosUsuario(req.body.id_usuario);
      return new JsonReponseSucesso(200, 'Alimentos retornados com sucesso', retornoAlimentosUsuario);
   }

   public async criarAlimento(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = criarAlimentoTabelaSchema.safeParse(req.body);
      if(!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);

      };
      const retornoCriacaoAlimento = await this.alimentoService.criarAlimento(resultadoParse.data);
      return new JsonReponseSucesso(201, 'Alimento criado com sucesso', retornoCriacaoAlimento);
   }

   public async atualizarAlimento(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = atualizarAlimentoSchema.safeParse(req.body);
      if(!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      const retornoAtualizacaoAlimento = await this.alimentoService.atualizarAlimento(resultadoParse.data);
      return new JsonReponseSucesso(201, 'Alimento atualizado com sucesso', retornoAtualizacaoAlimento);
   }

   public async obterAlimentoPorCodigoDeBarras(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const codigoDeBarras: string = req.params.codigo;
      const retornoAlimento = await this.alimentoService.obterAlimentoPorCodigoDeBarras(codigoDeBarras);
      return new JsonReponseSucesso(200, 'Alimento retornado com sucesso', retornoAlimento);
   }
   
}