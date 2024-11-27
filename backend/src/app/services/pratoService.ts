import { JsonReponseErro } from "../../utils/jsonReponses";
import PratoRepositorio from "../repositories/pratoRepositorio";
import Prato from "../entities/prato";
import AlimentoPratoService from "./alimentoPratoService";
import { criarPratoCompletoObject } from "../schemas/prato/criarPratoCompletoSchema";
import { atualizarPratoObject } from "../schemas/prato/atualizarPratoSchema";
import { deletarPratoObject } from "../schemas/prato/deletarPratoSchema";

export default class PratoService {

   private pratoRepo: PratoRepositorio;
   private alimentoPratoService: AlimentoPratoService;

   constructor() {
      this.pratoRepo = new PratoRepositorio()
      this.alimentoPratoService = new AlimentoPratoService()
   }

   public async obterPratosUsuario(usuarioID: string): Promise<Prato[] | null> {
      return await this.pratoRepo.obterPratosUsuario(usuarioID);
   }

   public async criarPrato(dadosCriacaoJSON: criarPratoCompletoObject): Promise<{}> {
      const { alimentos_prato: dadosAlimentosPrato, ...dadosNovoPrato } = dadosCriacaoJSON;
      const novoPrato = new Prato(dadosNovoPrato)
      await novoPrato.save();

      const alimentosPratoInseridos = await this.alimentoPratoService.criarAlimentosPrato(dadosAlimentosPrato, novoPrato.id_prato);
      return { ...novoPrato, alimentos_prato: alimentosPratoInseridos };
   }

   public async atualizarPrato(dadosAtualizacaoJSON: atualizarPratoObject): Promise<{}> {
      const prato = await this.pratoRepo.pegarPratoPorID(dadosAtualizacaoJSON.id_prato, dadosAtualizacaoJSON.id_usuario);
      if (!prato) {
         JsonReponseErro.lancar(404, 'Prato do usuário não encontrado');
      }
      prato!.atualizarDados(dadosAtualizacaoJSON);
      return await prato!.save();
   }

   public async deletarPrato(dadosDelecaoJSON: deletarPratoObject): Promise<{}> {
      const prato = await this.pratoRepo.pegarPratoPorID(dadosDelecaoJSON.id_prato, dadosDelecaoJSON.id_usuario);
      if (!prato) {
         JsonReponseErro.lancar(404, 'Prato do usuário não encontrado');
      }
      return await prato!.remove();
   }

}