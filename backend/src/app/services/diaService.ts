import DiaRepositorio from "../repositories/diaRepositorio";
import Dia from "../entities/dia";
import { salvarDiaObject } from "../schemas/dia/salvarDiaSchema";
import { JsonReponseErro } from "../../utils/jsonReponses";

export default class DiaService{
   
   private diaRepo: DiaRepositorio;

   constructor(){
      this.diaRepo = new DiaRepositorio()
   }

   public async obterDiasUsuario(usuarioID: string): Promise<Dia[]>{
      return await this.diaRepo.obterDiasUsuario(usuarioID);
   }

   public async salvarDia(dadosSalvarDia: salvarDiaObject): Promise<Dia> {
      let diaNovo = new Dia(dadosSalvarDia);
      let dia = await this.diaRepo.obterDiaUsuario(dadosSalvarDia.id_usuario, dadosSalvarDia.dt_dia);
      if(!dia){                  // verifica se esse dia ja existe
         if(diaNovo.ehValido()){ // dia antigo não existe e verifica se o novo eh valido
            return await diaNovo.save(); 
         }
         JsonReponseErro.lancar(400, 'Todos atributos do dia são nulos'); // dia antigo não existe e o novo eh invalido
      }
      dia!.atualizar(dadosSalvarDia);
      if(dia!.ehValido()){ // dia antigo existe e o dia atualizado eh valido
         return await dia!.save();
      }
      return await dia!.remove(); // dia antigo existe e o dia atualizado eh invalido
   }

}