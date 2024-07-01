import { EventEmitter } from 'events';
import CartaoService from '../app/services/cartaoService';
import TabelaNutricionalService from '../app/services/tabelaNutricionalService';

class Eventos {
   private static instancia: Eventos;
   private emissorEventos: EventEmitter;
   private cartaoService: CartaoService;
   private tabelaNutricionalService: TabelaNutricionalService;

   private constructor() {
      this.emissorEventos = new EventEmitter();
      this.cartaoService = new CartaoService();
      this.tabelaNutricionalService = new TabelaNutricionalService();
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

      this.emissorEventos.on('alimentoCriado', async (usuarioID) => {
         await this.tabelaNutricionalService.criarTabelaNutricional(usuarioID);
      });
   }
}

export default Eventos.pegarInstancia();
