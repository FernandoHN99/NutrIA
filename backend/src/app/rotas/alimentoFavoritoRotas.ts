import { Router } from 'express';
import Rota from '../../utils/rota';
import Util from '../../utils/util';
import AlimentoFavoritoController from '../controllers/alimentoFavoritoController';

export default class DiaRotas implements Rota {
   public caminho: string = '/alimento-favorito';
   public roteador: Router;
   public controller: AlimentoFavoritoController;

   constructor() {
      this.roteador = Router()
      this.controller = new AlimentoFavoritoController();
      this.roteador.get('/usuario', Util.envolveFuncTryCatch(this.controller, this.controller.obterAlimentosFavoritosUsuario));
      this.roteador.patch('/atualizar', Util.envolveFuncTryCatch(this.controller, this.controller.atualizarAlimentoFavorito));

      console.log('Rotas Alimento Favorito: Ativo');
   }
   
}

