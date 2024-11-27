import { PORTA_BACKEND, JWT_SECRET, listaRotasSemAuth } from './config/variaveis';
import Rota from './utils/rota';
import Servidor from './app/servidor';
import Util from './utils/util';

const listaRotas: Rota[] = Util.exportarColecaoInstacias('../app/rotas/');

const servidor: Servidor = new Servidor(PORTA_BACKEND, JWT_SECRET, listaRotasSemAuth, listaRotas);
servidor.iniciar();
