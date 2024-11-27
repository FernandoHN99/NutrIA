import { JsonReponseErro } from "../../utils/jsonReponses";
import TabelaNutricional from "../entities/tabelaNutricional";
import { criarTabelaNutricionalObject } from "../schemas/tabelaNutricional/criarTabelaNutricionalSchema";
import { atualizarTabelaNutricionalObject } from "../schemas/tabelaNutricional/atualizarTabelaNutricionalSchema";
import TabelaNutricionalRepositorio from "../repositories/tabelaNutricionalRepositorio";
import { criarNovaTabelaNutricionalObject } from "../schemas/tabelaNutricional/criarNovaTabelaNutricionalSchema";
import { deletarTabelaNutricionalObject } from "../schemas/tabelaNutricional/deletarTabelaNutricionalSchema";

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
      const tabelasNutricionais = await this.tabelaNutricionalRepo.pegarTabelasUsuarioPorIdAlimento(
         dadosCriacaoJSON.id_alimento, 
         dadosCriacaoJSON.id_usuario
      );
      if(!tabelasNutricionais || tabelasNutricionais?.length === 0){
         JsonReponseErro.lancar(404, 'Alimento não encontrado para o usuário');
      }
      const tabelaNutricionalUnique = tabelasNutricionais.find(
         tabelaNutricional => tabelaNutricional.unidade_medida === dadosCriacaoJSON.unidade_medida
      );
      if (tabelaNutricionalUnique){
         JsonReponseErro.lancar(409, 'Tabela nutricional com essa unidade de medida já existe para este alimento', 
            { id_tabela_nutricional: tabelaNutricionalUnique.id_tabela_nutricional }
         );
      }
      const alimento = tabelasNutricionais[0].alimento
      if(alimento.alimento_verificado){
         JsonReponseErro.lancar(400, 'Alimento verificado, não é possível criar tabela nutricional', 
         { id_alimento: alimento.id_alimento });
      }
      return await this.criarTabelaNutricional(dadosCriacaoJSON);
   }

   public async atualizarTabelaNutricional(dadosAtualizacaoJSON: atualizarTabelaNutricionalObject): Promise<TabelaNutricional>{
      const tabelaNutricional = await this.tabelaNutricionalRepo.pegarTabelaUsuarioPorId(
         dadosAtualizacaoJSON.id_tabela_nutricional,
         dadosAtualizacaoJSON.id_usuario
      );
      if(!tabelaNutricional){
         JsonReponseErro.lancar(404, 'Tabela Nutricional do usuário não encontrada');
      }
      if(tabelaNutricional!.alimento.alimento_verificado){
         JsonReponseErro.lancar(400, 'Alimento verificado, não é possível atualizar', 
            { id_alimento: tabelaNutricional!.alimento.id_alimento });
      }
      tabelaNutricional!.atualizarDados(dadosAtualizacaoJSON);
      return tabelaNutricional!.save()
   }

   public async deletarTabelaNutricional(dadosDelecaoJSON: deletarTabelaNutricionalObject): Promise<TabelaNutricional>{
      const tabelaNutricional = await this.tabelaNutricionalRepo.pegarTabelaUsuarioPorId(
         dadosDelecaoJSON.id_tabela_nutricional,
         dadosDelecaoJSON.id_usuario
      );
      if(!tabelaNutricional){
         JsonReponseErro.lancar(404, 'Tabela Nutricional do usuário não encontrada');
      }
      const tabelasNutricionais = await this.tabelaNutricionalRepo.pegarTabelasUsuarioPorIdAlimento(
         tabelaNutricional!.alimento?.id_alimento,
         dadosDelecaoJSON.id_usuario
      );
      if(!tabelasNutricionais || tabelasNutricionais?.length === 1){
         JsonReponseErro.lancar(403, 'Alimento necessita ter pelo menos uma tabela nutricional');
      }
      if(tabelaNutricional!.alimento?.alimento_verificado){
         JsonReponseErro.lancar(403, 'Alimento verificado, não é possível deletar', 
            { id_alimento: tabelaNutricional!.alimento.id_alimento });
      }
      return await tabelaNutricional!.remove();
   }

}