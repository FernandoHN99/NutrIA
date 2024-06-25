import { PORTA_BACKEND, JWT_SECRET } from './config/variaveis';
import Rota from './utils/rota';
import Servidor from './app/servidor';
import Util from './utils/util';

const porta: number = PORTA_BACKEND;
const chaveJWT: string = JWT_SECRET;
const listaRotas: Rota[] = Util.exportarColecaoInstacias('../app/rotas/');
const listaRotasSemAuth = ['/nutria/usuario/criar', '/nutria/usuario/login'];

const servidor: Servidor = new Servidor(porta, chaveJWT, listaRotasSemAuth, listaRotas);
servidor.iniciar();
