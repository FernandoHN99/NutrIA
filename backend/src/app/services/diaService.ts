import DiaRepositorio from "../repositories/diaRepositorio";
import Dia from "../entities/dia";
import { JsonReponseErro } from "../../utils/jsonReponses";
import { salvarDiaObject } from "../schemas/dia/salvarDiaSchema";

export default class DiaService{
   
   private diaRepo: DiaRepositorio;

   constructor(){
      this.diaRepo = new DiaRepositorio()
   }

   public async pegarDiasUsuario(usuarioID: string): Promise<Dia[]>{
      return await this.diaRepo.obterDiasUsuario(usuarioID);
   }

   public async salvarDia(dadosSalvarDia: salvarDiaObject): Promise<Dia> {
      let dia = await this.diaRepo.pegarDiaUsuario(dadosSalvarDia.id_usuario, dadosSalvarDia.dt_dia);
      if(dia){
         dia.atualizar(dadosSalvarDia);
      }else{
         dia = new Dia(dadosSalvarDia);
      }
      return await dia.save();
   }

}