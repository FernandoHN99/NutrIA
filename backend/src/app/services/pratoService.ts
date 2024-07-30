import { JsonReponseErro } from "../../utils/jsonReponses";
import PratoRepositorio from "../repositories/pratoRepositorio";
import Prato from "../entities/prato";
import { criarPratoCompletoObject } from "../schemas/prato/criarPratoCompletoSchema";
import { atualizarPratoCompletoObject } from "../schemas/prato/atualizarPratoCompletoSchema";
import { upsertAlimentoPratoObject } from "../schemas/alimentoPrato/upsertAlimentoPratoSchema";
import AlimentoPratoService from "./alimentoPratoService";
import Util from "../../utils/util";

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

   public async atualizarPrato(dadosAtualizacaoJSON: atualizarPratoCompletoObject): Promise<{}> {
      let alimentoPrato;
      const { alimento_prato: dadosAlimentoPrato, ...dadosPrato } = dadosAtualizacaoJSON;
      const prato = await this.pratoRepo.pegarPratoPorID(dadosPrato.id_prato, dadosPrato.id_usuario);
      if (!prato) {
         JsonReponseErro.lancar(404, 'Prato do usuário não encontrado');
      }
      if (dadosAlimentoPrato && Util.contarNumeroKeysJSON(dadosAlimentoPrato) > 1) {
         alimentoPrato = await this.alimentoPratoService.upsertAlimentoPrato(
            dadosAlimentoPrato as upsertAlimentoPratoObject, 
            dadosPrato.id_prato
         );
      }
      if(Util.contarNumeroKeysJSON(dadosPrato) > 2){
         prato!.atualizarDados(dadosPrato);
         await prato!.save();
      }
      return { ...prato, alimento_prato: alimentoPrato };
   }

}