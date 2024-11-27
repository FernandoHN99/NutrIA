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
   dados: any;
}

export default class ChatBotService {
   private openai: any;
   // private contextoSistemaBase = "Você é um assistente nutricional especializado em tópicos de nutrição! Você deve responder com o mínimo de palavras possíveis! Seja curto e grosso, se existir cálculos NÃO os exiba ao usuário somente os resultados NÃO SEJA redundante nas respostas! Você sempre terá as informações básicas do usuário, portanto SEMPRE se baseia nas caracteristicas dele e PRINCIPALMENTE no pilares de dietas flexível, contagem de macronutrientes e balanço energético";
   private contextoSistemaBase = "Você é um assistente nutricional especializado em nutrição! Perguntas quem fujam do tema de saúde e nutrição você não deve responder. Seja breve e responda com o mínimo de palavras possíveis! Se existir cálculos NÃO exiba ao usuário somente os resultados. NÃO SEJA redundante nas respostas! Você sempre terá as informações básicas do usuário, portanto SEMPRE se baseia nas caracteristicas dele e PRINCIPALMENTE no pilares de dietas flexível, contagem de macronutrientes e balanço energético. Ex: Ofereça alternativas para opções alimentares, tire dúvidas e etc.";
   private contextoSistemaFuncoes = "Você é um assistente nutricional especializado em invocar funções para ajudar o usuário a preencher o seu registro de alimentos. Se atente a função solicitada e seu respectivo schema!";
   private contextoSistemaImagens = `Você é um assistente nutricional especializado em analisar fotos de pratos de comida e retorne com precisão os nomes dos alimentos, a quantidade total, o conteúdo de macronutrientes (carboidratos, proteínas, gorduras e álcool, se aplicável), bem como o total de calorias. Se não houver alimentos para ser analisado, retorne: "A imagem não possui alimentos.\n\nExemplo de Saida:\nAlimento:  Nome Alimento 01,\nQuantidade: Qtde Alimento 01,\nMacronutrientes:  Carboidratos 01, Proteínas 01,  Gorduras 01, Alcool 01\nCalorias: kcal 01\n\nAlimento:  Nome Alimento 02,\nQuantidade: Qtde Alimento 02,\nMacronutrientes:  Carboidratos 02, Proteínas 02,  Gorduras 02, Alcool 02\nCalorias: kcal 02`;
   private comandosDeFuncoes = ["adicionar", "add", "adicione", "coloque" , "colocar", "inserir", "insira", "registre", "registrar"];
   private paramsIABase = { temp: 0.3, maxTokens: 2048, topP: 0.5, freqP: 0.5, presP: 0.5, response_format: { "type": "text" } };

   constructor() {
      this.openai = new OpenAI({ apiKey: OPEN_AI_API_KEY });
   }

   public async perguntar(fazerPerguntaJSON: fazerPerguntaObject): Promise<IChatBotRetorno> {
      const promptChat = this.montarPromptPergunta(fazerPerguntaJSON.mensagensChat);
      // console.log(JSON.stringify(promptChat));
      const chatBotRetorno = await this.openai.chat.completions.create(promptChat);
      const { tool_calls, content } = chatBotRetorno.choices[0]?.message
      // console.log(JSON.stringify(chatBotRetorno.choices));
      if (!tool_calls && !content) {
         JsonReponseErro.lancar(400, 'Erro ao completar a conversa com o chatbot');
      }
      if (tool_calls && tool_calls.length > 0) {
         return this.chamarAcaoBackend(tool_calls[0].function, fazerPerguntaJSON.id_usuario)
      }
      return { acao: null, resposta: content, dados: null };
   }

   public async analisarFoto(analisarFotoJSON: fazerPerguntaObject): Promise<IChatBotRetorno> {
      const promptChat = this.montarPromptAnalisarFoto(analisarFotoJSON.mensagensChat);
      // console.log(JSON.stringify(promptChat));
      const chatBotRetorno = await this.openai.chat.completions.create(promptChat);
      // console.log(JSON.stringify(chatBotRetorno));
      const { content } = chatBotRetorno.choices[0]?.message
      if (!content) {
         JsonReponseErro.lancar(400, 'Erro ao analisar foto.');
      }
      const payloadPerguntaSomenteTexto = this.tratarPayloadIMG(analisarFotoJSON, content);
      const retornoResposta = await this.perguntar(payloadPerguntaSomenteTexto);
      return retornoResposta;
      // return {...retornoResposta, dados: `[IMAGEM]: ${content}`};
   }

   private montarPromptPergunta(mensagensChat: chatMessagesObject[]): object {
      const { nomeModelo, contextoSistema, funcoes } = this.montarParamsIA(mensagensChat);

      return (
         {
            model: nomeModelo,
            messages: [
               { "role": "system", "content": contextoSistema },
               ...mensagensChat
            ],
            temperature: this.paramsIABase.temp,
            max_tokens: this.paramsIABase.maxTokens,
            top_p: this.paramsIABase.topP,
            frequency_penalty: this.paramsIABase.freqP,
            presence_penalty: this.paramsIABase.presP,
            tools: funcoes,
            response_format: this.paramsIABase.response_format
         }
      );
   }

   private montarPromptAnalisarFoto(mensagensChat: chatMessagesObject[]): object {
      const imgRequestJSON = mensagensChat[mensagensChat.length - 2];
      return (
         {
            model: 'gpt-4o-mini',
            messages: [
               { "role": "system", "content": this.contextoSistemaImagens },
               imgRequestJSON,
            ],
            temperature: this.paramsIABase.temp,
            max_tokens: this.paramsIABase.maxTokens,
            top_p: this.paramsIABase.topP,
            frequency_penalty: this.paramsIABase.freqP,
            presence_penalty: this.paramsIABase.presP,
         }
      );
   }

   private montarParamsIA(mensagensChat: chatMessagesObject[]): any {
      // const objectParams: any = { nomeModelo: 'ft:gpt-4o-mini-2024-07-18:personal:eureka-v2:AMdf022C', contextSistema: this.contextoSistemaBase, funcoes: null};
      const objectParams: any = { nomeModelo: 'gpt-4o-mini', contextoSistema: this.contextoSistemaBase, funcoes: null};
      const lastMessage = mensagensChat[mensagensChat.length - 1].content[0].text.toLocaleLowerCase();
      const invocarFuncao = this.comandosDeFuncoes.some(palavra => lastMessage.includes(palavra));
      // console.log('invocarFuncao ', invocarFuncao);
      if (invocarFuncao) {
         objectParams.nomeModelo = 'gpt-4o';
         objectParams.funcoes = [addConsumoOpenAI];
         objectParams.contextoSistema = this.contextoSistemaFuncoes;
      }
      return objectParams;
   }


   private async chamarAcaoBackend(requestFunctionCall: { name: string, arguments: any }, usuarioID: string): Promise<IChatBotRetorno> {
      const responseAcao: IChatBotRetorno = { acao: requestFunctionCall.name, resposta: '', dados: null };
      try {
         const requestJSON = JSON.parse(requestFunctionCall.arguments);
         // console.log(requestFunctionCall.arguments);
         switch (requestFunctionCall.name) {
            case 'add_consumo_alimento': {
               const alimentoConsumidoService = new AlimentoConsumidoService();
               const requestAddConsumoAlimentos = requestJSON.alimentos.map(
                  (alimento: any) => ({ ...alimento, dtt_alimento_consumido: new Date().toISOString() })
               );
               // console.log('requestAddConsumoAlimentos ', requestAddConsumoAlimentos);
               const responseAddConsumo: AlimentoConsumido[] = await alimentoConsumidoService.cadastrarAlimentosConsumidos(
                  { alimentosConsumidos: requestAddConsumoAlimentos, id_usuario: usuarioID } as criarAlimentoConsumidoCompletoObject
               );
               responseAcao.dados = responseAddConsumo;
               responseAcao.resposta = responseAddConsumo.length > 1
                  ? 'Alimentos adicionados com sucesso'
                  : 'Alimento adicionado com sucesso';
               break;
            }
         }
      } catch (error) {
         JsonReponseErro.lancar(400, 'Erro ao processar a chamada da função', error);
      }
      return responseAcao;
   }

   private tratarPayloadIMG (requestJSON: fazerPerguntaObject, retornoAnalisarFoto: string): fazerPerguntaObject {
      const mensagensChatList = requestJSON.mensagensChat;
      const indexRef = (mensagensChatList.length - 1) - 1;
      mensagensChatList.splice((indexRef), 1);
      mensagensChatList[indexRef].content[0].text =  '[CONTEÚDO IMAGEM ENVIADA]: ' + retornoAnalisarFoto + '\n\n' + mensagensChatList[indexRef].content[0].text;
      return { id_usuario: requestJSON.id_usuario, mensagensChat: mensagensChatList };
   }

}