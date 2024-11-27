import { Router } from 'express';
import Rota from '../../utils/rota';
import RefeicaoController from '../controllers/refeicaoController';
import Util from '../../utils/util';

export default class DiaRotas implements Rota {
   public caminho: string = '/refeicao';
   public roteador: Router;
   public controller: RefeicaoController;

   constructor() {
      this.roteador = Router()
      this.controller = new RefeicaoController();

      this.roteador.post('/criar', Util.envolveFuncTryCatch(this.controller, this.controller.criarRefeicao));
      this.roteador.patch('/atualizar', Util.envolveFuncTryCatch(this.controller, this.controller.atualizarRefeicao));
      this.roteador.get('/usuario', Util.envolveFuncTryCatch(this.controller, this.controller.obterRefeicoesUsuario));

      console.log('Rotas Refeicao: Ativo');
   }
   
}

