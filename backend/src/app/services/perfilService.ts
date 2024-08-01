import PerfilRepositorio from "../repositories/perfilRepositorio";
import { JsonReponseErro } from "../../utils/jsonReponses";
import Perfil from "../entities/perfil";

export default class PerfilService{
   
   private perfilRepo: PerfilRepositorio;

   constructor(){
      this.perfilRepo = new PerfilRepositorio()
   }

   public async obterPerfisUsuario(usuarioID: string): Promise<Perfil[]> {
      return await this.perfilRepo.obterPerfisUsuario(usuarioID);
   }

}