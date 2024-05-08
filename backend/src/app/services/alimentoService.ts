import AlimentoRepositorio from "../repositories/alimentoRepositorio";
import { buscarAlimentosOject } from "../schemas/alimento/buscarAlimentoSchema";
import { JsonReponseErro } from "../../utils/jsonReponses";
import Alimento from "../entities/alimento";

export default class AlimentoService{
   
   private alimentoRepo: AlimentoRepositorio;

   constructor(){
      this.alimentoRepo = new AlimentoRepositorio()
   }

   public async obterAlimentos(buscarAlimentosJSON: buscarAlimentosOject): Promise<Alimento[]>{
      if(buscarAlimentosJSON.nome){
         return await this.alimentoRepo.obterAlimentosPorNome(
            buscarAlimentosJSON.nome, 
            buscarAlimentosJSON.pegar, 
            buscarAlimentosJSON.pular
         );
      }
      return await this.alimentoRepo.obterAlimentos(buscarAlimentosJSON.pegar, buscarAlimentosJSON.pular);
   }

}