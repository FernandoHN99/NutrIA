import CartaoRepositorio from "../repositories/cartaoRepositorio";
import Cartao from "../entities/cartao";
import { tiposDeCartao } from "../../config/variaveis";
import { atualizarCartaoObject } from "../schemas/cartao/atualizarCartao";
import { JsonReponseErro } from "../../utils/jsonReponses";

export default class CartaoService{
   
   private cartaoRepo: CartaoRepositorio;

   constructor(){
      this.cartaoRepo = new CartaoRepositorio()
   }

   public async pegarCartoesUsuario(usuarioID: string): Promise<Cartao[]> {
      return await this.cartaoRepo.pegarCartoesUsuario(usuarioID);
   }

   public async criarCartoesUsuario(usuarioID: string): Promise<Cartao[]> {
      const listaCartoes = this.criarListaCartoes(usuarioID);
      await this.cartaoRepo.criarCartoesUsuario(listaCartoes);
      return listaCartoes;
   }

   public async marcarCartaoLido(dadosCartaoAtualizacao: atualizarCartaoObject){
      let cartaoAtual: Cartao = await this.pegarCartao(dadosCartaoAtualizacao.id_usuario, dadosCartaoAtualizacao.tipo_cartao);
      if(cartaoAtual.dtt_interacao_cartao){
         JsonReponseErro.lancar(400, 'Cartão já foi lido');
      }
      cartaoAtual.marcarCartaoLido();
      return await cartaoAtual.save();
   }

   private async pegarCartao(usuarioID: string, tipoCartao: string): Promise<Cartao> {
      const cartaoRetornado = await this.cartaoRepo.pegarCartao(usuarioID, tipoCartao);
      if(!cartaoRetornado){
         JsonReponseErro.lancar(404, 'Cartão não encontrado');
      }
      return cartaoRetornado!;
   }

   private criarListaCartoes(usuarioID: string): Cartao[] {
      const listaCartoes: Cartao[] = [];
      tiposDeCartao.forEach(tipo => {
         listaCartoes.push(new Cartao(usuarioID, tipo));
      });
      return listaCartoes;
   }

}