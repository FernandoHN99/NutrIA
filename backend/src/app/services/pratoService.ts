import { JsonReponseErro } from "../../utils/jsonReponses";
import PratoRepositorio from "../repositories/pratoRepositorio";
import Prato from "../entities/prato";
import { criarPratoObject } from "../schemas/prato/criarPratoSchema";
import { atualizarPratoObject } from "../schemas/prato/atualizarPratoSchema";
export default class PratoService{
   
   private pratoRepo: PratoRepositorio;

   constructor(){
      this.pratoRepo = new PratoRepositorio()
   }

   public async obterPratosUsuario(usuarioID: string): Promise<Prato[] | null> {
      return await this.pratoRepo.obterPratosUsuario(usuarioID);
   }

   public async criarPrato(dadosCriacaoJSON: criarPratoObject): Promise<Prato> {
      const novoPrato = new Prato(dadosCriacaoJSON)
      return await novoPrato.save();
   }

   public async atualizarPrato(dadosAtualizacaoJSON: atualizarPratoObject): Promise<Prato> {
      const prato = await this.pratoRepo.pegarPratoPorID(dadosAtualizacaoJSON.id_prato);
      if(!prato){
         JsonReponseErro.lancar(404, 'Prato não encontrado');
      }
      if(prato!.id_usuario !== dadosAtualizacaoJSON.id_usuario){
         JsonReponseErro.lancar(403, 'Usuário não tem permissão para atualizar este prato');
      }
      prato!.atualizarDados(dadosAtualizacaoJSON);
      return await prato!.save();
   }

}