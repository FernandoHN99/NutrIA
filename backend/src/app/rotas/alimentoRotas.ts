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
      this.roteador.get('/codigo-de-barras/:codigo', Util.envolveFuncTryCatch(this.controller, this.controller.obterAlimentoPorCodigoDeBarras));
      this.roteador.get('/usuario', Util.envolveFuncTryCatch(this.controller, this.controller.obterAlimentosUsuario));
      this.roteador.get('/buscar', Util.envolveFuncTryCatch(this.controller, this.controller.buscarAlimentos));
      this.roteador.post('/criar', Util.envolveFuncTryCatch(this.controller, this.controller.criarAlimento));
      this.roteador.patch('/atualizar', Util.envolveFuncTryCatch(this.controller, this.controller.atualizarAlimento));

      console.log('Rotas Alimento: Ativo');
   }
   
}

