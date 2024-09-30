import { Router } from 'express';
import Rota from '../../utils/rota';
import ChatBotController from '../controllers/chatBotController';
import Util from '../../utils/util';

export default class UsuarioRotas implements Rota {
   public caminho: string = '/chatbot';
   public roteador: Router;
   public controller: ChatBotController;

   constructor() {
      this.roteador = Router()
      this.controller = new ChatBotController();

      this.roteador.post('/perguntar', Util.envolveFuncTryCatch(this.controller, this.controller.perguntar));    
      
      console.log('Rotas Chatbot: Ativo');
   }
}

