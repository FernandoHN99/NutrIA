import { JsonReponseErro } from "../../utils/jsonReponses";
import PratoRepositorio from "../repositories/pratoRepositorio";
import Prato from "../entities/prato";
import AlimentoPrato from "../entities/alimentoPrato";
import AlimentoPratoRepositorio from "../repositories/alimentoPratoRepositorio";
import { criarPratoObject } from "../schemas/prato/criarPratoSchema";
import { atualizarPratoObject } from "../schemas/prato/atualizarPratoSchema";
export default class PratoService {

   private pratoRepo: PratoRepositorio;
   private alimentoPratoRepo: AlimentoPratoRepositorio;

   constructor() {
      this.pratoRepo = new PratoRepositorio()
      this.alimentoPratoRepo = new AlimentoPratoRepositorio()
   }

   public async obterPratosUsuario(usuarioID: string): Promise<Prato[] | null> {
      return await this.pratoRepo.obterPratosUsuario(usuarioID);
   }

   public async criarPrato(dadosCriacaoJSON: criarPratoObject): Promise<{}> {
      const novoPrato = new Prato(dadosCriacaoJSON)
      await novoPrato.save();

      const alimentosDoPrato = dadosCriacaoJSON.alimentos_prato.map((alimento) => {
         const novoAlimentoPrato = new AlimentoPrato(alimento);
         novoAlimentoPrato.id_prato = novoPrato.id_prato;
         return novoAlimentoPrato;
      });

      await this.alimentoPratoRepo.getRepositorio().save(alimentosDoPrato);

      return { ...novoPrato, alimentos_prato: alimentosDoPrato };
   }

   public async atualizarPrato(dadosAtualizacaoJSON: atualizarPratoObject): Promise<Prato> {
      const prato = await this.pratoRepo.pegarPratoPorID(dadosAtualizacaoJSON.id_prato);
      if (!prato) {
         JsonReponseErro.lancar(404, 'Prato não encontrado');
      }
      if (prato!.id_usuario !== dadosAtualizacaoJSON.id_usuario) {
         JsonReponseErro.lancar(403, 'Usuário não tem permissão para atualizar este prato');
      }
      prato!.atualizarDados(dadosAtualizacaoJSON);
      return await prato!.save();
   }

}