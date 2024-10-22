import { JsonReponseErro } from "../../utils/jsonReponses";
import OpenAI from "openai";
import { OPEN_AI_API_KEY } from "../../config/variaveis"
import { chatMessagesObject } from "../schemas/chatBot/chatMessagesSchema";
import { fazerPerguntaObject } from "../schemas/chatBot/fazerPerguntaSchema";
import { addConsumoOpenAI } from "../../utils/modelosFuncoesOpenAI/addConsumoOpenAI";
import AlimentoConsumidoService from "./alimentoConsumidoService";
import { criarAlimentoConsumidoObject } from "../schemas/alimentoConsumido/criarAlimentoConsumidoSchema";
import { criarAlimentoConsumidoCompletoObject } from "../schemas/alimentoConsumido/criarAlimentoConsumidoCompletoSchema";
import AlimentoConsumido from "../entities/alimentoConsumido";

interface IChatBotRetorno {
   acao: string | null;
   resposta: string;
   dados: object;
}

export default class ChatBotService {
   private openai: any;

   constructor() {
      this.openai = new OpenAI({ apiKey: OPEN_AI_API_KEY });
   }

   private montarPromptPergunta(mensagensChat: chatMessagesObject[]): object {
      const comandosDeFuncoes = ["adicionar", "add", "adicione"];
      const lastMessage = mensagensChat[mensagensChat.length-1].content.toLocaleLowerCase();
      const invocarFuncao = comandosDeFuncoes.some(palavra => lastMessage.includes(palavra));

      const nomeModelo = "ft:gpt-4o-mini-2024-07-18:personal:nutria-add-consumo-prod:AI0lLD2M";
      const contextoSistema = "Você é um assistente nutricional e sua função é fornecer respostas claras e diretas sobre tópicos de nutrição em portguês Brasil. Seja breve e use poucas palavras, ajude o usuario em  montar de refeições, controlar  calorias e dar dicas e feedbacks para ter uma alimentação  baseados nos pilares de dietas flexível, contagem de macronutrientes e balanço energético.";
      const adicionarConsumoFn = addConsumoOpenAI;

      return (
         {
            model: nomeModelo,
            messages: [
               { "role": "system", "content": contextoSistema },
               ...mensagensChat
            ],
            temperature: 1,
            max_tokens: 500,
            top_p: 0.5,
            frequency_penalty: 0,
            presence_penalty: 0,
            tools: invocarFuncao ? [{ ...adicionarConsumoFn }] : null,
            response_format: {
              "type": "text"
            },
         }
      );
   }

   private montarPromptAnalisarFoto(mensagensChat: chatMessagesObject[]): object {
      const nomeModelo = "gpt-4o-mini";
      const contextoSistema = `Interprete SOMENTE fotos de pratos de comida e retorne com precisão os nomes dos alimentos, a quantidade total, o conteúdo de macronutrientes (carboidratos, proteínas, gorduras e álcool, se aplicável), bem como o total de calorias. Se não houver alimentos para ser analisado, retorne: "A imagem não possui alimentos.\n\nExemplo de Saida:\nAlimento:  Nome Alimento 01,\nQuantidade: Qtde Alimento 01,\nMacronutrientes:  Carboidratos 01, Proteínas 01,  Gorduras 01, Alcool 01\nCalorias: kcal 01\n\nAlimento:  Nome Alimento 02,\nQuantidade: Qtde Alimento 02,\nMacronutrientes:  Carboidratos 02, Proteínas 02,  Gorduras 02, Alcool 02\nCalorias: kcal 02`;

      return (
         {
            model: nomeModelo,
            messages: [
               { "role": "system", "content": contextoSistema },
               ...mensagensChat
            ],
            temperature: 1,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
         }
      );
   }

   public async perguntar(fazerPerguntaJSON: fazerPerguntaObject): Promise<IChatBotRetorno> {
      const promptChat = this.montarPromptPergunta(fazerPerguntaJSON.mensagensChat);
      const chatBotRetorno = await this.openai.chat.completions.create(promptChat);
      const { tool_calls, content } = chatBotRetorno.choices[0]?.message
      console.log(JSON.stringify(chatBotRetorno.choices[0]?.message));
      if(!tool_calls && !content){
         JsonReponseErro.lancar(400, 'Erro ao completar a conversa com o chatbot');
      }
      if (tool_calls && tool_calls.length > 0) {
         return this.chamarAcaoBackend(tool_calls[0].function, fazerPerguntaJSON.id_usuario)
      }
      return { acao: null, resposta: content, dados: {} };
   }

   private async chamarAcaoBackend(requestFunctionCall: { name: string, arguments: any }, usuarioID: string): Promise<IChatBotRetorno> {
      const responseAcao: IChatBotRetorno = { acao: requestFunctionCall.name, resposta: '', dados: [{}] };
      try {
         const requestJSON = JSON.parse(requestFunctionCall.arguments);
         console.log(requestFunctionCall.arguments);
         switch (requestFunctionCall.name) {
            case 'add_consumo_alimento': {
               const alimentoConsumidoService = new AlimentoConsumidoService();
               const requestAddConsumoAlimentos = requestJSON.alimentos.map(
                  (alimento: any) => ({ ...alimento, dtt_alimento_consumido: new Date().toISOString() })
               );
               console.log('requestAddConsumoAlimentos ', requestAddConsumoAlimentos);
               const responseAddConsumo: AlimentoConsumido[] = await alimentoConsumidoService.cadastrarAlimentosConsumidos(
                  {alimentosConsumidos: requestAddConsumoAlimentos, id_usuario: usuarioID} as criarAlimentoConsumidoCompletoObject
               );
               responseAcao.dados = responseAddConsumo;
               responseAcao.resposta = responseAddConsumo.length > 1 ? 'Alimentos adicionados com sucesso' : 'Alimento adicionado com sucesso';
               break;
            }
         }
      } catch (error) {
         JsonReponseErro.lancar(400, 'Erro ao processar a chamada da função', error);
      }
      return responseAcao;
   }

}