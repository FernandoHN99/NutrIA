import ControleCaloriasRepositorio from "../repositories/alimentoConsumidoRepositorio";
import AlimentoConsumido from "../entities/alimentoConsumido";
import { buscarAlimentosConsumidosObject } from "../schemas/alimentoConsumido/buscarAlimentosConsumidosSchema";
import { criarAlimentoConsumidoObject } from "../schemas/alimentoConsumido/criarAlimentoConsumidoSchema";
import { atualizarAlimentoConsumidoObject } from "../schemas/alimentoConsumido/atualizarAlimentoConsumidoSchema";
import { deletarAlimentoConsumidoObject } from "../schemas/alimentoConsumido/deletarAlimentoConsumido";
import { JsonReponseErro } from "../../utils/jsonReponses";
import { criarAlimentoConsumidoCompletoObject } from "../schemas/alimentoConsumido/criarAlimentoConsumidoCompletoSchema";

export default class AlimentoConsumidoService{
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

   private async obterAlimentoConsumido(idAlimentoConsumido: number, usuarioID: string): Promise<AlimentoConsumido>{
      const alimentoConsumido = await this.controleCaloriasRepo.obterAlimentoConsumido(idAlimentoConsumido, usuarioID);
      if(!alimentoConsumido){
         JsonReponseErro.lancar(400, 'Alimento consumido não encontrado');
      }
      return alimentoConsumido
   }

   public async cadastrarAlimentosConsumidos(criarAlimentoConsumidoCompletoJSON: criarAlimentoConsumidoCompletoObject): Promise<AlimentoConsumido[]>{
      const listaAlimentoConsumidos = this.mapearAlimentosConsumidos(criarAlimentoConsumidoCompletoJSON.alimentosConsumidos, criarAlimentoConsumidoCompletoJSON.id_usuario);
      const retornoAlimentosAdicionados = await this.controleCaloriasRepo.inserirAlimentosConsumidos(listaAlimentoConsumidos);
      return await this.controleCaloriasRepo.obterAlimentosConsumidosPorId(retornoAlimentosAdicionados.map(alimento => alimento.id_alimento_consumido));
   }

   public async atualizarAlimentoConsumido(atualizarAlimentoConsumidoJSON: atualizarAlimentoConsumidoObject): Promise<AlimentoConsumido>{
      let alimentoConsumido = await this.obterAlimentoConsumido(
         atualizarAlimentoConsumidoJSON.id_alimento_consumido, 
         atualizarAlimentoConsumidoJSON.id_usuario
      );
      if(!alimentoConsumido){
         JsonReponseErro.lancar(400, 'Alimento consumido não encontrado');
      }
      alimentoConsumido.atualizarDados(atualizarAlimentoConsumidoJSON);
      return await alimentoConsumido.save();
   }

   public async deletarAlimentoConsumido(deletarAlimentoConsumidoJSON: deletarAlimentoConsumidoObject): Promise<AlimentoConsumido>{
      const alimentoConsumido = await this.obterAlimentoConsumido(deletarAlimentoConsumidoJSON.id_alimento_consumido, deletarAlimentoConsumidoJSON.id_usuario);
      return await alimentoConsumido.remove();
   }


   private mapearAlimentosConsumidos(alimentosConsumidos: criarAlimentoConsumidoObject[], ususarioID: string): AlimentoConsumido[] {
      return alimentosConsumidos.map(alimento => {
         alimento.id_usuario = ususarioID;
         return new AlimentoConsumido(alimento);
      });
   }

}