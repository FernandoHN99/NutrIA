import { Router } from 'express';
import Rota from '../../utils/rota';
import AlimentoController from '../controllers/alimentoController';
import Util from '../../utils/util';

export default class DiaRotas implements Rota {
   public caminho: string = '/alimento';
   public roteador: Router;
   public controller: AlimentoController;

   constructor() {
      this.roteador = Router()
      this.controller = new AlimentoController();
      this.roteador.get('/buscar', Util.envolveFuncTryCatch(this.controller, this.controller.obterAlimentos));

      console.log('Rotas Alimento: Ativo');
   }
   
}

