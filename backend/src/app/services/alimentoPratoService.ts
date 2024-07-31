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
      const alimentosPrato = await this.alimentoPratoRepo.pegarAlimentosPratoUsuarioPorPratoID(
         dadosCriacaoJSON.id_prato!, 
         dadosCriacaoJSON.id_usuario!
      );
      //melhor validacao possivel a ser feita para garantir que o prato pertence o usuario. Se o prato nao pertencer ao usuario, ou, pertencer, porem nao tiver nenhum alimento, nao ira prosseguir. Isso significa que a regra de nogocio de deletar prato com no minimo 1 alimento nao esta funcionando
      if(!alimentosPrato || alimentosPrato?.length === 0){ 
         JsonReponseErro.lancar(404, 'Prato não encontrado para o usuário');
      }
      const alimentoPrato = new AlimentoPrato(dadosCriacaoJSON);
      return await alimentoPrato.save();
   }

   public async criarAlimentosPrato(alimentosPrato: any[], pratoID: number): Promise<AlimentoPrato[]> {
      const alimentosPratoInsercao = this.mapearAlimentosPrato(alimentosPrato, pratoID);
      return await this.alimentoPratoRepo.inserirAlimentosPrato(alimentosPratoInsercao);
   }

   public async atualizarAlimentoPrato(dadosAtualizacaoJSON: atualizarAlimentoPratoObject): Promise<AlimentoPrato> {
      const alimentoPrato = await this.alimentoPratoRepo.pegarAlimentoPratoUsuarioPorID(
         dadosAtualizacaoJSON.id_alimento_prato,
         dadosAtualizacaoJSON.id_usuario
      );
      if (!alimentoPrato) {
         JsonReponseErro.lancar(404, 'Alimento do prato não encontrado para atualizar');
      }
      alimentoPrato!.atualizarDados(dadosAtualizacaoJSON);
      return await alimentoPrato!.save();
   }

   public async upsertAlimentoPrato(dadosUpsertJSON: upsertAlimentoPratoObject): Promise<AlimentoPrato> {
      if('id_alimento_prato' in dadosUpsertJSON!){
         return await this.atualizarAlimentoPrato(dadosUpsertJSON as atualizarAlimentoPratoObject);
      }
      return await this.criarAlimentoPrato(dadosUpsertJSON as criarAlimentoPratoObject);
   }

   public async deletarAlimentoPrato(dadosDeletarJSON: deletarAlimentoPratoObject): Promise<AlimentoPrato> {
      const alimentoPrato = await this.alimentoPratoRepo.pegarAlimentoPratoUsuarioPorID(
         dadosDeletarJSON.id_alimento_prato,
         dadosDeletarJSON.id_usuario
      );
      if (!alimentoPrato) {
         JsonReponseErro.lancar(404, 'Alimento do prato não encontrado para deletar');
      }
      const alimentosPrato = await this.alimentoPratoRepo.pegarAlimentosPratoUsuarioPorPratoID(
         alimentoPrato!.id_prato!, 
         dadosDeletarJSON.id_usuario
      );
      if(!alimentosPrato || alimentosPrato?.length <= 1){
         JsonReponseErro.lancar(403, 'Prato deve conter no mínimo um alimento', alimentosPrato);
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