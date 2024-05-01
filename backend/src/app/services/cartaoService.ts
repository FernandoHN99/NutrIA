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


}