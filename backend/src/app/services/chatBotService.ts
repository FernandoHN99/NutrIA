import { JsonReponseErro } from "../../utils/jsonReponses";
import OpenAI from "openai";
import { OPEN_AI_API_KEY } from "../../config/variaveis"
import { fazerPerguntaObject } from "../schemas/chatBot/fazerPerguntaSchema";

interface IChatBotRetorno {
   acao: string;
   resposta: string;
   dados: object;
}

export default class ChatBotService {
   private openai: any;
   private nomeModelo: string;
   private contextoSistema: string;;

   constructor() {
      this.openai = new OpenAI({ apiKey: OPEN_AI_API_KEY });
      this.nomeModelo = "ft:gpt-4o-mini-2024-07-18:personal:my-nutria02:A3WJNd57";
      this.contextoSistema = "Você é um assistente nutricional especializado e sua função é fornecer respostas claras e diretas sobre tópicos de nutrição, incluindo planejamento de refeições, controle de calorias e dicas para uma alimentação saudável baseados nos pilares de dietas flexível, contagem de macronutrientes e balanço energético. Você também deve retornar informação nutricional sobre alimentos baseado em nossa tabela de alimentos e ajuda os usuários a registrar seu consumo calórico durante o dia em refeições específicas quando solicitado. Você deve gerar em um formato JSON específico para que o sistema de backend possa processar e executar ações conforme necessário.";
   }

   private montarPrompt(inputUsuario: string): object {
      return (
         {
            messages: [
               { "role": "system", "content": this.contextoSistema },
               { "role": "user", "content": inputUsuario }
            ],
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            response_format: {
               "type": "json_object"
            },
            model: this.nomeModelo,
         }
      );
   }

   public async perguntar(inputUsuario: fazerPerguntaObject): Promise<IChatBotRetorno> {
      const chatBotRetorno = await this.openai.chat.completions.create(this.montarPrompt(inputUsuario.prompt_usuario));
      if(chatBotRetorno.choices[0]?.message?.content === undefined){
         JsonReponseErro.lancar(400, 'Erro ao processar a requisição');
      }
      return JSON.parse(chatBotRetorno.choices[0]?.message?.content)
   }


}