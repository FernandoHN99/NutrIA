import ControleCaloriasRepositorio from "../repositories/alimentoConsumidoRepositorio";
import AlimentoConsumido from "../entities/alimentoConsumido";
import { buscarAlimentosConsumidosObject } from "../schemas/alimentoConsumido/buscarAlimentosConsumidosSchema";
import { criarAlimentoConsumidoObject } from "../schemas/alimentoConsumido/criarAlimentoConsumidoSchema";
import { JsonReponseErro } from "../../utils/jsonReponses";
import { atualizarAlimentoConsumidoObject } from "../schemas/alimentoConsumido/atualizarAlimentoConsumidoSchema";

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

   private async obterAlimentoConsumido(id_alimento_consumido: number): Promise<AlimentoConsumido>{
      const alimentoConsumido = await this.controleCaloriasRepo.obterAlimentoConsumido(id_alimento_consumido);
      if(!alimentoConsumido){
         JsonReponseErro.lancar(400, 'Alimento consumido não encontrado');
      }
      return alimentoConsumido
   }

   public async cadastrarAlimentoConsumido(cadastrarConsumoAlimentoJSON: criarAlimentoConsumidoObject): Promise<AlimentoConsumido>{
      let novoAlimentoConsumido = new AlimentoConsumido(cadastrarConsumoAlimentoJSON);
      return await novoAlimentoConsumido.save();
   }

   public async atualizarAlimentoConsumido(atualizarAlimentoConsumidoJSON: atualizarAlimentoConsumidoObject): Promise<AlimentoConsumido>{
      let alimentoConsumido = await this.obterAlimentoConsumido(atualizarAlimentoConsumidoJSON.id_alimento_consumido);
      if(alimentoConsumido.id_usuario !== atualizarAlimentoConsumidoJSON.id_usuario){
         JsonReponseErro.lancar(401, 'Alimento consumido não pertence ao usuário informado');
      
      }
      alimentoConsumido.atualizarDados(atualizarAlimentoConsumidoJSON);
      return await alimentoConsumido.save();
   }

   
}