import { Router, Request, Response, NextFunction } from 'express';
import Rota from '../../utils/rota';
import DiaController from '../controllers/diaController';
import Util from '../../utils/util';

export default class DiaRotas implements Rota {
   public caminho: string = '/dia';
   public roteador: Router;
   public controller: DiaController;

   constructor() {
      this.roteador = Router()
      this.controller = new DiaController();

      this.roteador.post('/salvar', Util.envolveFuncTryCatch(this.controller, this.controller.salvarDia));
      this.roteador.delete('/deletar', Util.envolveFuncTryCatch(this.controller, this.controller.removerDia));
      this.roteador.get('/:id_usuario', Util.envolveFuncTryCatch(this.controller, this.controller.obterDiasUsuario));

      console.log('Rotas Dia: Ativo');
   }
   
}

