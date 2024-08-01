import CartaoService from "../services/cartaoService";
import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import { atualizarCartaoSchema } from "../schemas/cartao/atualizarCartao";

export default class CartaoController{
   private cartaoService: CartaoService;

   constructor(){
      this.cartaoService = new CartaoService();
   }

   public async obterCartoesUsuario(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const retornoCartoes = await this.cartaoService.pegarCartoesUsuario(req.body.id_usuario);
      return new JsonReponseSucesso(200, 'Cartoes retornados com sucesso', retornoCartoes);
   }

   public async marcarCartaoLido(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = atualizarCartaoSchema.safeParse(req.body); 
      if (!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      const retornoCartaoLido = await this.cartaoService.marcarCartaoLido(resultadoParse.data);
      return new JsonReponseSucesso(200, 'Cartao atualizado com sucesso', retornoCartaoLido);
   }

}