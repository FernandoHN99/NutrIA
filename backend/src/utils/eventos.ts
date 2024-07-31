import { EventEmitter } from 'events';
import CartaoService from '../app/services/cartaoService';

class Eventos {
   private static instancia: Eventos;
   private emissorEventos: EventEmitter;
   private cartaoService: CartaoService;

   private constructor() {
      this.emissorEventos = new EventEmitter();
      this.cartaoService = new CartaoService();
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
      });
   }
}

export default Eventos.pegarInstancia();
