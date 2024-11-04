import DiaRepositorio from "../repositories/diaRepositorio";
import Dia from "../entities/dia";
import { salvarDiaObject } from "../schemas/dia/salvarDiaSchema";
import { JsonReponseErro } from "../../utils/jsonReponses";
import { deletarDiaObject } from "../schemas/dia/deletarDiaSchema";

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
      let diaAntigo = await this.diaRepo.obterDiaUsuario(dadosSalvarDia.id_usuario, dadosSalvarDia.dt_dia);
      if(!diaAntigo && !diaNovo.ehValido()){
         return diaNovo;
         // JsonReponseErro.lancar(400, 'Dia não pode ser criado com todos seus valores nulos');
      }
      if(diaAntigo && !diaNovo.ehValido()){
         diaAntigo.remove();
         return diaNovo;
         // JsonReponseErro.lancar(400, 'Dia não pode ser atualizado com todos seus valores nulos');
      }
      return await (diaAntigo ? new Dia({...diaAntigo, ...dadosSalvarDia}) : diaNovo).save();
   }

   public async removerDia(diaRemoverDados: deletarDiaObject): Promise<void>{
      let diaRemover = await this.obterDiaUsuario(diaRemoverDados.id_usuario, diaRemoverDados.dt_dia);
      await diaRemover.remove();
   }

   private async obterDiaUsuario(usuarioID: string, dtDia: string): Promise<Dia>{
      let diaRemover = await this.diaRepo.obterDiaUsuario(usuarioID, dtDia);
      if(!diaRemover){
         JsonReponseErro.lancar(404, 'Dia não encontrado');
      }
      return diaRemover!;
   }

}