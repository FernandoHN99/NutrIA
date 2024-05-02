import CartaoRepositorio from "../repositories/cartaoRepositorio";
import Cartao from "../entities/cartao";
export default class CartaoService{
   
   private cartaoRepo: CartaoRepositorio;

   constructor(){
      this.cartaoRepo = new CartaoRepositorio()
   }

   public async pegarCartoesUsuario(usuarioID: string): Promise<Cartao | null> {
      return await this.cartaoRepo.pegarCartoesUsuario(usuarioID);
   }

   public async criarCartoesUsuario(usuarioID: string): Promise<Cartao[]> {
      const listaCartoes = this.criarCartoesPadrao(usuarioID);
      await this.cartaoRepo.criarCartaoUsuario(listaCartoes);
      return listaCartoes;
   }

   private criarCartoesPadrao(usuarioID: string): Cartao[] {
      const cartao = new Cartao(usuarioID, 'MACROS');
      const cartao02 = new Cartao(usuarioID, 'CALORIAS');
      return [cartao, cartao02];
   }

}