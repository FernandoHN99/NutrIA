import { JsonReponseErro } from "../../utils/jsonReponses";
import PratoRepositorio from "../repositories/pratoRepositorio";
import Prato from "../entities/prato";

export default class PratoService{
   
   private pratoRepo: PratoRepositorio;

   constructor(){
      this.pratoRepo = new PratoRepositorio()
   }

   public async obterPratosUsuario(usuarioID: string): Promise<Prato[] | null> {
      return await this.pratoRepo.obterPratosUsuario(usuarioID);
   }

}