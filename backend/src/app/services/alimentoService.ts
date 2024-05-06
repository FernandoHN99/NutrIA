import AlimentoRepositorio from "../repositories/alimentoRepositorio";
import Refeicao from "../entities/refeicao";
import { JsonReponseErro } from "../../utils/jsonReponses";
import Alimento from "../entities/alimento";

export default class AlimentoService{
   
   private alimentoRepo: AlimentoRepositorio;

   constructor(){
      this.alimentoRepo = new AlimentoRepositorio()
   }

   public async obterAlimentos(): Promise<Alimento[]>{
      return await this.alimentoRepo.obterAlimentos();
   }

}