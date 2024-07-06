import { JsonReponseErro } from "../../utils/jsonReponses";
import TabelaNutricional from "../entities/tabelaNutricional";
import { criarTabelaNutricionalObject } from "../schemas/tabelaNutricional/criarTabelaNutricionalSchema";
import { atualizarTabelaNutricionalObject } from "../schemas/tabelaNutricional/atualizarTabelaNutricionalSchema";
import TabelaNutricionalRepositorio from "../repositories/tabelaNutricionalRepositorio";
import { criarNovaTabelaNutricionalObject } from "../schemas/tabelaNutricional/criarNovaTabelaNutricionalSchema";
export default class TabelaNutricionalService{

   private tabelaNutricionalRepo: TabelaNutricionalRepositorio;
   
   constructor(){
      this.tabelaNutricionalRepo = new TabelaNutricionalRepositorio()
   }

   public async criarTabelaNutricional(dadosCriacaoJSON: criarTabelaNutricionalObject): Promise<TabelaNutricional> {
      const tabelaNutricional = new TabelaNutricional(dadosCriacaoJSON);
      return await tabelaNutricional.save();
   }

   public async criarNovaTabelaNutricional(dadosCriacaoJSON: criarNovaTabelaNutricionalObject): Promise<TabelaNutricional> {
      const tabelaNutricionalAtual: TabelaNutricional | null = await this.tabelaNutricionalRepo
         .pegarTabelaUnique(dadosCriacaoJSON.id_alimento, dadosCriacaoJSON.unidade_medida);
      if(tabelaNutricionalAtual){
         JsonReponseErro.lancar(409, 'Tabela Nutricional com essa unidade de medida já existe para este alimento', tabelaNutricionalAtual);
      }
      const tabelaNutricional = await this.tabelaNutricionalRepo.pegarTabelaPorIdAlimento(dadosCriacaoJSON.id_alimento);
      if(!tabelaNutricional){
         JsonReponseErro.lancar(404, 'Alimento não encontrado');
      }
      const alimento = tabelaNutricional!.alimento;
      if(dadosCriacaoJSON.id_usuario !== alimento.id_usuario){
         JsonReponseErro.lancar(403, 'Usuário não autorizado');
      }
      if(alimento.alimento_verificado){
         JsonReponseErro.lancar(400, 'Alimento verificado, não é possível criar tabela nutricional', 
            { id_alimento: tabelaNutricional!.alimento.id_alimento });
      }
      return await this.criarTabelaNutricional(dadosCriacaoJSON);
   }

   public async atualizarTabelaNutricional(dadosAtualizacaoJSON: atualizarTabelaNutricionalObject): Promise<TabelaNutricional>{
      const tabelaNutricional: TabelaNutricional | null = await this.tabelaNutricionalRepo.pegarTabelaPorId(
         dadosAtualizacaoJSON.id_tabela_nutricional
      );
      if(!tabelaNutricional){
         JsonReponseErro.lancar(404, 'Tabela Nutricional não encontrada');
      }
      if(dadosAtualizacaoJSON.id_usuario !== tabelaNutricional!.alimento.id_usuario){
         JsonReponseErro.lancar(403, 'Usuário não autorizado');
      }
      if(tabelaNutricional!.alimento.alimento_verificado){
         JsonReponseErro.lancar(400, 'Alimento verificado, não é possível atualizar', 
            { id_alimento: tabelaNutricional!.alimento.id_alimento });
      }
      tabelaNutricional!.atualizarDados(dadosAtualizacaoJSON);
      return tabelaNutricional!.save()
   }


}