import { Router, Request, Response, NextFunction } from 'express';
import Rota from '../../utils/rota';
import TabelaNutricionalController from '../controllers/tabelaNutricionalController';
import Util from '../../utils/util';

export default class TabelaNutricionalRotas implements Rota {
   public caminho: string = '/tabela-nutricional';
   public roteador: Router;
   public controller: TabelaNutricionalController;

   constructor() {
      this.roteador = Router()
      this.controller = new TabelaNutricionalController();

      this.roteador.post('/criar', Util.envolveFuncTryCatch(this.controller, this.controller.criarNovaTabelaNutricional));
      this.roteador.patch('/atualizar', Util.envolveFuncTryCatch(this.controller, this.controller.atualizarTabelaNutricional));
      this.roteador.delete('/deletar', Util.envolveFuncTryCatch(this.controller, this.controller.deletarTabelaNutricional));

      console.log('Rotas Tabela Nutricional: Ativo');
   }
   
}

