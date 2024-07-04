import { JsonReponseErro } from "../../utils/jsonReponses";
import PratoRepositorio from "../repositories/pratoRepositorio";
import Prato from "../entities/prato";
import { criarPratoObject } from "../schemas/prato/criarPratoSchema";

export default class PratoService{
   
   private pratoRepo: PratoRepositorio;

   constructor(){
      this.pratoRepo = new PratoRepositorio()
   }

   public async obterPratosUsuario(usuarioID: string): Promise<Prato[] | null> {
      return await this.pratoRepo.obterPratosUsuario(usuarioID);
   }

   public async criarPrato(dadosJSON: criarPratoObject): Promise<Prato> {
      const pratoExistente = await this.pratoRepo.pegarPratoUnique(dadosJSON.nome_prato, dadosJSON.id_usuario);
      if(pratoExistente){
         JsonReponseErro.lancar(400, 'Não é possível criar um prato de mesmo nome', pratoExistente);
      }
      const novoPrato = new Prato(dadosJSON)
      return await novoPrato.save();
   }

}