import { EventEmitter } from 'events';
import CartaoService from '../app/services/cartaoService';
import RefeicaoService from '../app/services/refeicaoService';

class Eventos {
   private static instancia: Eventos;
   private emissorEventos: EventEmitter;
   private cartaoService: CartaoService;
   private refeicaoService: RefeicaoService;

   private constructor() {
      this.emissorEventos = new EventEmitter();
      this.cartaoService = new CartaoService();
      this.refeicaoService = new RefeicaoService();
      this.registrarListeners();
   }

   public static pegarInstancia(): Eventos {
      if (!this.instancia) {
         this.instancia = new Eventos();
      }
      return this.instancia;
   }

   public emitir(event: string, data: any): void {
      this.emissorEventos.emit(event, data);
   }

   private registrarListeners(): void {
      this.emissorEventos.on('usuarioCriado', async (usuarioID) => {
         await this.cartaoService.criarCartoesUsuario(usuarioID);
         await this.refeicaoService.criarRefeicoesUsuario(usuarioID);
      });
   }
}

export default Eventos.pegarInstancia();
