import RefeicaoRepositorio from "../repositories/refeicaoRepositorio";
import Refeicao from "../entities/refeicao";
import { criarRefeicaoObject } from "../schemas/refeicao/criarRefeicaoSchema";
import { JsonReponseErro } from "../../utils/jsonReponses";
import { atualizarRefeicaoObject } from "../schemas/refeicao/atualizarRefeicaoSchema";
import { listaNomeRefeicoesBase } from "../../config/variaveis";
import Util from "../../utils/util";

export default class RefeicaoService{
   
   private refeicaoRepo: RefeicaoRepositorio;

   constructor(){
      this.refeicaoRepo = new RefeicaoRepositorio()
   }

   public async obterRefeicoesUsuario(usuarioID: string): Promise<Refeicao[]>{
      return await this.refeicaoRepo.obterRefeicoesUsuario(usuarioID);
   }

   public async criarRefeicao(criarRefeicaoDados: criarRefeicaoObject): Promise<any>{
      criarRefeicaoDados.numero_refeicao = await this.refeicaoRepo.contarRefeicoesUsuario(criarRefeicaoDados.id_usuario) + 1;
      const novaRefeicao = new Refeicao(criarRefeicaoDados);
      return await novaRefeicao.save();
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

   public async criarRefeicoesUsuario(usuarioID: string): Promise<Refeicao[]> {
      const listaRefeicoes = this.criarListaRefeicoes(usuarioID);
      await this.refeicaoRepo.criarRefeicoesUsuario(listaRefeicoes);
      return listaRefeicoes;
   }

   private criarListaRefeicoes(usuarioID: string): Refeicao[] {
      const listaRefeicoesBase: Refeicao[] = [];
      let refeicaoObj: criarRefeicaoObject;
      listaNomeRefeicoesBase.forEach((nomeRefeicao, index) => {
         refeicaoObj = { id_usuario: usuarioID, nome_refeicao: nomeRefeicao, ativa: true, numero_refeicao: (index+1), dt_criacao: Util.criarStrData() };
         listaRefeicoesBase.push(new Refeicao(refeicaoObj));
      });
      return listaRefeicoesBase;
   }

}