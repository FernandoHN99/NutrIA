import CartaoService from "../services/cartaoService";
import { Request, Response, NextFunction } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import validate  from 'uuid-validate'

export default class CartaoController{
   private cartaoService: CartaoService;

   constructor(){
      this.cartaoService = new CartaoService();
   }

   public async obterCartoesUsuario(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const usuarioID: string = req.params.id_usuario;
      if(!validate(usuarioID)){
         JsonReponseErro.lancar(400, 'ID do usuário inválido');
      }
      const retornoCartoes = await this.cartaoService.pegarCartoesUsuario(usuarioID);
      return new JsonReponseSucesso(200, 'Cartoes retornados com sucesso', retornoCartoes);
   }

   public async criarCartoesUsuario(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const usuarioID: string = req.params.id_usuario;
      if(!validate(usuarioID)){
         JsonReponseErro.lancar(400, 'ID do usuário inválido');
      }
      const retornoCartao = await this.cartaoService.criarCartoesUsuario(usuarioID);
      return new JsonReponseSucesso(200, 'Cartao criado com sucesso', retornoCartao);
   }

}

   //    const retornoCartoes = await cartaoRepository.find({
   //       relations: ['usuario']
   // });