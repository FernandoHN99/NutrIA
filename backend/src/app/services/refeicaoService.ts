import RefeicaoRepositorio from "../repositories/refeicaoRepositorio";
import Refeicao from "../entities/refeicao";
import { criarRefeicaoObject } from "../schemas/refeicao/criarRefeicaoSchema";
import { JsonReponseErro } from "../../utils/jsonReponses";
import { atualizarRefeicaoObject } from "../schemas/refeicao/atualizarRefeicaoSchema";

export default class RefeicaoService{
   
   private refeicaoRepo: RefeicaoRepositorio;

   constructor(){
      this.refeicaoRepo = new RefeicaoRepositorio()
   }

   public async obterRefeicoesUsuario(usuarioID: string): Promise<Refeicao[]>{
      return await this.refeicaoRepo.obterRefeicoesUsuario(usuarioID);
   }

   public async criarRefeicao(ciarRefeicaoDados: criarRefeicaoObject): Promise<any>{
      let numeroRefeicoes = await this.refeicaoRepo.contarRefeicoesUsuario(ciarRefeicaoDados.id_usuario);
      const novaRefeicao = new Refeicao(ciarRefeicaoDados, (numeroRefeicoes + 1));
      await this.refeicaoRepo.criarRefeicao(novaRefeicao);
      return novaRefeicao;
   }

   private async obterRefeicao(id_usuario: string, numero_refeicao: number): Promise<Refeicao>{
      const refeicaoAtual = await this.refeicaoRepo.obterRefeicao(id_usuario, numero_refeicao);
      if(!refeicaoAtual){
         JsonReponseErro.lancar(404, 'Refeição não encontrada');
      }
      return refeicaoAtual;
   }

   public async atualizarRefeicao(atualizarRefeicaoDados: atualizarRefeicaoObject): Promise<any>{
      let refeicaoAtual = await this.obterRefeicao(atualizarRefeicaoDados.id_usuario, atualizarRefeicaoDados.numero_refeicao);
      refeicaoAtual.atualizar(atualizarRefeicaoDados);
      return await refeicaoAtual.save();
   }

}