import { Router } from 'express';
import Rota from '../../utils/rota';
import AlimentoConsumidoController from '../controllers/alimentoConsumidoController';
import Util from '../../utils/util';

export default class AlimentoConsumidoRotas implements Rota {
   public caminho: string = '/alimento-consumido';
   public roteador: Router;
   public controller: AlimentoConsumidoController;

   constructor() {
      this.roteador = Router()
      this.controller = new AlimentoConsumidoController();
      this.roteador.get('/:usuarioID', Util.envolveFuncTryCatch(this.controller, this.controller.obterConsumoUsuario));
      this.roteador.put('/criar', Util.envolveFuncTryCatch(this.controller, this.controller.cadastrarAlimentoConsumido));
      this.roteador.put('/atualizar', Util.envolveFuncTryCatch(this.controller, this.controller.atualizarAlimentoConsumido));

      console.log('Rotas Alimentos Consumidos: Ativo');
   }
   
}