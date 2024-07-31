import { JsonReponseErro } from "../../utils/jsonReponses";
import AlimentoPrato from "../entities/alimentoPrato";
import AlimentoPratoRepositorio from "../repositories/alimentoPratoRepositorio";
import { atualizarAlimentoPratoObject } from "../schemas/alimentoPrato/atualizarAlimentoPratoSchema";
import { upsertAlimentoPratoObject } from "../schemas/alimentoPrato/upsertAlimentoPratoSchema";
import { criarAlimentoPratoObject } from "../schemas/alimentoPrato/criarAlimentoPratoSchema";
import { deletarAlimentoPratoObject } from "../schemas/alimentoPrato/deletarAlimentoPratoSchema";

export default class AlimentoPratoService {

   private alimentoPratoRepo: AlimentoPratoRepositorio;

   constructor() {
      this.alimentoPratoRepo = new AlimentoPratoRepositorio()
   }

   public async criarAlimentoPrato(dadosCriacaoJSON: criarAlimentoPratoObject): Promise<AlimentoPrato> {
      const alimentoPrato = new AlimentoPrato(dadosCriacaoJSON);
      return await alimentoPrato.save();
   }

   public async criarAlimentosPrato(alimentosPrato: any[], pratoID: number): Promise<AlimentoPrato[]> {
      const alimentosPratoInsercao = this.mapearAlimentosPrato(alimentosPrato, pratoID);
      return await this.alimentoPratoRepo.inserirAlimentosPrato(alimentosPratoInsercao);
   }

   public async atualizarAlimentoPrato(dadosAtualizacaoJSON: atualizarAlimentoPratoObject, usuarioID: string): Promise<AlimentoPrato> {
      const alimentoPrato = await this.alimentoPratoRepo.pegarAlimentoPratoUsuarioPorID(
         dadosAtualizacaoJSON.id_alimento_prato,
         usuarioID
      );
      if (!alimentoPrato) {
         JsonReponseErro.lancar(404, 'Alimento do prato não encontrado para o usuário');
      }
      alimentoPrato!.atualizarDados(dadosAtualizacaoJSON);
      return await alimentoPrato!.save();
   }

   public async upsertAlimentoPrato(dadosUpsertJSON: upsertAlimentoPratoObject, usuarioID: string): Promise<AlimentoPrato> {
      if('id_alimento_prato' in dadosUpsertJSON!){
         return await this.atualizarAlimentoPrato(dadosUpsertJSON, usuarioID);
      }
      return await this.criarAlimentoPrato(dadosUpsertJSON);
   }

   public async deletarAlimentoPrato(dadosDeletarJSON: deletarAlimentoPratoObject): Promise<AlimentoPrato> {
      const alimentoPrato = await this.alimentoPratoRepo.pegarAlimentoPratoUsuarioPorID(
         dadosDeletarJSON.id_alimento_prato,
         dadosDeletarJSON.id_usuario
      );
      if (!alimentoPrato) {
         JsonReponseErro.lancar(404, 'Alimento do prato não encontrado para o usuário');
      }
      return await alimentoPrato!.remove();
   }

   private mapearAlimentosPrato(alimentosPrato: AlimentoPrato[], pratoID: number): AlimentoPrato[] {
      return alimentosPrato.map(alimento => {
         const novoAlimentoPrato = new AlimentoPrato(alimento);
         novoAlimentoPrato.id_prato = pratoID;
         return novoAlimentoPrato;
      });
   }

}