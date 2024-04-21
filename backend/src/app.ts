import UsuarioRotas from './app/rotas/usuarioRotas';
import { PORTA_BACKEND } from './config/config';
import Rota from './app/rotas/rota';
import Servidor from './app/servidor';


const porta: number = PORTA_BACKEND;
const listaSubRotas: Rota[] = [
   new UsuarioRotas()
];

const servidor: Servidor = new Servidor(porta, listaSubRotas);
servidor.iniciar();
