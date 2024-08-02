import PerfilRepositorio from "../repositories/perfilRepositorio";
import { JsonReponseErro } from "../../utils/jsonReponses";
import Perfil from "../entities/perfil";
import { criarPerfilObject } from "../schemas/perfil/criarPerfilSchema";

export default class PerfilService{
   
   private perfilRepo: PerfilRepositorio;

   constructor(){
      this.perfilRepo = new PerfilRepositorio()
   }

   public async obterPerfisUsuario(usuarioID: string): Promise<Perfil[]> {
      return await this.perfilRepo.obterPerfisUsuario(usuarioID);
   }

   public async criarPerfil(dadosPerfil: criarPerfilObject): Promise<Perfil> {
      let perfil: Perfil;
      perfil = await this.perfilRepo.obterPerfilUnique(dadosPerfil.id_usuario, dadosPerfil.dt_criacao_perfil);
      if(perfil){
         perfil.atualizarDados(dadosPerfil);
      }else{
         perfil = new Perfil(dadosPerfil);
      }
      return await perfil.save();
   }

}