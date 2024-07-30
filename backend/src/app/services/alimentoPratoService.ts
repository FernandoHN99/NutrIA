import { JsonReponseErro } from "../../utils/jsonReponses";
import AlimentoPrato from "../entities/alimentoPrato";
import AlimentoPratoRepositorio from "../repositories/alimentoPratoRepositorio";
import { atualizarAlimentoPratoObject } from "../schemas/alimentoPrato/atualizarAlimentoPratoSchema";
import { upsertAlimentoPratoObject } from "../schemas/alimentoPrato/upsertAlimentoPratoSchema";
import { criarAlimentoPratoObject } from "../schemas/alimentoPrato/criarAlimentoPratoSchema";

export default class AlimentoPratoService {

   private alimentoPratoRepo: AlimentoPratoRepositorio;

   constructor() {
      this.alimentoPratoRepo = new AlimentoPratoRepositorio()
   }

   public async criarAlimentoPrato(dadosCriacaoJSON: criarAlimentoPratoObject, pratoID: number): Promise<AlimentoPrato> {
      dadosCriacaoJSON.id_prato = pratoID;
      const alimentoPrato = new AlimentoPrato(dadosCriacaoJSON);
      return await alimentoPrato.save();
   }

   public async criarAlimentosPrato(alimentosPrato: any[], pratoID: number): Promise<AlimentoPrato[]> {
      const alimentosPratoInsercao = this.mapearAlimentosPrato(alimentosPrato, pratoID);
      return await this.alimentoPratoRepo.inserirAlimentosPrato(alimentosPratoInsercao);
   }

   public async atualizarAlimentoPrato(dadosAtualizacaoJSON: atualizarAlimentoPratoObject, pratoID: number): Promise<AlimentoPrato> {
      const alimentoPrato = await this.alimentoPratoRepo.pegarAlimentoPratoPorID(
         dadosAtualizacaoJSON.id_alimento_prato, 
         pratoID
      );
      if (!alimentoPrato || alimentoPrato.id_prato !== pratoID) {
         JsonReponseErro.lancar(404, 'Alimento do prato não encontrado para o usuário');
      }
      alimentoPrato!.atualizarDados(dadosAtualizacaoJSON);
      return await alimentoPrato!.save();
   }

   public async upsertAlimentoPrato(dadosUpsertJSON: upsertAlimentoPratoObject, pratoID: number): Promise<AlimentoPrato> {
      if('id_alimento_prato' in dadosUpsertJSON!){
         return await this.atualizarAlimentoPrato(
            dadosUpsertJSON as atualizarAlimentoPratoObject, 
            pratoID
         );
      }
      return await this.criarAlimentoPrato(
         dadosUpsertJSON as criarAlimentoPratoObject, 
         pratoID!
      );
   }

   private mapearAlimentosPrato(alimentosPrato: AlimentoPrato[], pratoID: number): AlimentoPrato[] {
      return alimentosPrato.map(alimento => {
         const novoAlimentoPrato = new AlimentoPrato(alimento);
         novoAlimentoPrato.id_prato = pratoID;
         return novoAlimentoPrato;
      });
   }

}