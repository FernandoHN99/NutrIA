import { PORTA_BACKEND } from './config/variaveis';
import Rota from './utils/rota';
import Servidor from './app/servidor';
import { directoryImport } from 'directory-import';
import Util from './utils/util';

const porta: number = PORTA_BACKEND;
const listaRotas: Rota[] = Util.returnarInstaciasRotas(directoryImport('./app/rotas/'));

const servidor: Servidor = new Servidor(porta, listaRotas);
servidor.iniciar();
