import DiaRepositorio from "../repositories/diaRepositorio";
import Dia from "../entities/dia";
import { JsonReponseErro } from "../../utils/jsonReponses";

export default class DiaService{
   
   private diaRepo: DiaRepositorio;

   constructor(){
      this.diaRepo = new DiaRepositorio()
   }

   public async pegarDiasUsuario(usuarioID: string): Promise<Dia[]>{
      return await this.diaRepo.obterDiasUsuario(usuarioID);
   }

}