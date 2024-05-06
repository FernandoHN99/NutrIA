import RefeicaoRepositorio from "../repositories/refeicaoRepositorio";
import Refeicao from "../entities/refeicao";
import { criarRefeicaoObject } from "../schemas/refeicao/criarRefeicaoSchema";

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
      const novaRefeicao = new Refeicao(ciarRefeicaoDados.id_usuario, ciarRefeicaoDados.nome_refeicao, (numeroRefeicoes + 1));
      await this.refeicaoRepo.criarRefeicao(novaRefeicao);
      return novaRefeicao;
   }

}