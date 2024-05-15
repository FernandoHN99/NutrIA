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
      const dias = await this.diaRepo.obterDiasUsuario(usuarioID);
      return dias.map(dia => this.converterTiposDadosDia(dia));
   }

   public async salvarDia(dadosSalvarDia: salvarDiaObject): Promise<Dia> {
      let diaNovo = new Dia(dadosSalvarDia);
      let dia = await this.diaRepo.obterDiaUsuario(dadosSalvarDia.id_usuario, dadosSalvarDia.dt_dia);
      // Se o dia não existir, cria um novo dia
      if(!dia){
         if(diaNovo.ehValido()){
            return await diaNovo.save();
         }
         JsonReponseErro.lancar(400, 'Todos atributos do dia são nulos');
      }
      // Se o dia existir e for valido, atualiza
      dia!.atualizar(dadosSalvarDia);
      if(dia!.ehValido()){
         return await dia!.save();
      }
      // Se o dia não for válido, remove
      return await dia!.remove();
   }

   private converterTiposDadosDia(dia: Dia): Dia{
      dia.foto_dia = dia.foto_dia ? dia.foto_dia.toString() : null;
      dia.medida_abdomen_dia = dia.medida_abdomen_dia ? parseFloat(dia.medida_abdomen_dia.toString()) : null;
      dia.peso_dia = dia.peso_dia ? parseFloat(dia.peso_dia.toString()) : null;
      return dia;
   }

}