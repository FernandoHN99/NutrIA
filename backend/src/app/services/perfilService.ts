import { JsonReponseErro } from "../../utils/jsonReponses";
import { criarPerfilObject } from "../schemas/perfil/criarPerfilSchema";
import { atualizarPerfilObject } from "../schemas/perfil/atualizarPerfilSchema";
import PerfilRepositorio from "../repositories/perfilRepositorio";
import Perfil from "../entities/perfil";

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

   public async atualizarPerfil(dadosPerfil: atualizarPerfilObject): Promise<Perfil> {
      let perfil: Perfil;
      perfil = await this.perfilRepo.obterPerfilPorID(dadosPerfil.id_perfil);
      if(!perfil){
         JsonReponseErro.lancar(404, 'Perfil não encontrado');
      }
      perfil.atualizarDados(dadosPerfil);
      return await perfil.save();
   }

}