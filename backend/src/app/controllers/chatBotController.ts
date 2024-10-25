import ChatBotService from "../services/chatBotService";
import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import { fazerPerguntaSchema } from "../schemas/chatBot/fazerPerguntaSchema";

export default class ChatBotController{
   private chatBotService: ChatBotService;

   constructor(){
      this.chatBotService = new ChatBotService();
   }

   public async perguntar(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = fazerPerguntaSchema.safeParse(req.body); 
      if (!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      const resposta = await this.chatBotService.perguntar(resultadoParse.data);
      return new JsonReponseSucesso(200, 'Resposta retornada com sucesso', resposta);
   }

   public async analisarFoto(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = fazerPerguntaSchema.safeParse(req.body); 
      if (!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      console.log(JSON.stringify(resultadoParse.data));
      const resposta = await this.chatBotService.analisarFoto(resultadoParse.data);
      return new JsonReponseSucesso(200, 'Resposta retornada com sucesso', resposta);
   }


}