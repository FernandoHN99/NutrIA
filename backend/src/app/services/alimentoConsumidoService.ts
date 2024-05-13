import ControleCaloriasRepositorio from "../repositories/alimentoConsumidoRepositorio";
import AlimentoConsumido from "../entities/alimentoConsumido";
import { buscarAlimentosConsumidosObject } from "../schemas/alimentoConsumido/buscarAlimentosConsumidosSchema";
import { criarAlimentoConsumidoObject } from "../schemas/alimentoConsumido/criarAlimentoConsumidoSchema";
import { JsonReponseErro } from "../../utils/jsonReponses";

export default class ControleCaloriasService{
   
   private controleCaloriasRepo: ControleCaloriasRepositorio;

   constructor(){
      this.controleCaloriasRepo = new ControleCaloriasRepositorio()
   }

   public async obterConsumoUsuario(usuarioID: string, dadosbusca: buscarAlimentosConsumidosObject): Promise<AlimentoConsumido[]>{
      if(dadosbusca.dataInicio! > dadosbusca.dataFim!){
         JsonReponseErro.lancar(400, 'Data de início maior que data de fim');
      }
      return await this.controleCaloriasRepo.obterConsumoUsuario(usuarioID, dadosbusca.dataInicio!, dadosbusca.dataFim!);
   }

   public async cadastrarConsumoAlimento(cadastrarConsumoAlimentoJSON: criarAlimentoConsumidoObject): Promise<AlimentoConsumido>{
      let novoAlimentoConsumido = new AlimentoConsumido(cadastrarConsumoAlimentoJSON);
      return await novoAlimentoConsumido.save();
   }
}