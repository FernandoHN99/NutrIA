import { PORTA_BACKEND } from './config/variaveis';
import Rota from './utils/rota';
import Servidor from './app/servidor';
import Util from './utils/util';
const porta: number = PORTA_BACKEND;
const listaRotas: Rota[] = Util.exportarColecaoInstacias('../app/rotas/');

const servidor: Servidor = new Servidor(porta, listaRotas);
servidor.iniciar();
