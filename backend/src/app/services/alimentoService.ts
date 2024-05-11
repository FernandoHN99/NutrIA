import AlimentoRepositorio from "../repositories/alimentoRepositorio";
import { buscarAlimentosOject } from "../schemas/alimento/buscarAlimentoSchema";
import { criarAlimentoObject } from "../schemas/alimento/criarAlimentoSchema";
import { JsonReponseErro } from "../../utils/jsonReponses";
import Alimento from "../entities/alimento";

export default class AlimentoService{
   
   private alimentoRepo: AlimentoRepositorio;

   constructor(){
      this.alimentoRepo = new AlimentoRepositorio()
   }

   public async obterAlimentos(buscarAlimentos: buscarAlimentosOject): Promise<Alimento[]>{
      if(buscarAlimentos.nome){
         return await this.alimentoRepo.obterAlimentosPorNome(
            buscarAlimentos.nome, 
            buscarAlimentos.pegar, 
            buscarAlimentos.pular
         );
      }
      return await this.alimentoRepo.obterAlimentos(buscarAlimentos.pegar, buscarAlimentos.pular);
   }

   public async criarAlimento(criarAlimento: criarAlimentoObject): Promise<Alimento>{
      const alimento = new Alimento(criarAlimento);
      console.log(alimento);
      return await alimento.save();
   }

}