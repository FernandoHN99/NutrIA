
import Cartao from "../entities/cartao";
import { AppDataSource } from '../../database/data-source';

export default class CartaoRepositorio{

   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(Cartao);
   }

   public async pegarCartoesUsuario(usuarioID: string): Promise<Cartao[]> {
      return await this.repositorio.find({ 
         where: { 
            id_usuario: usuarioID 
         }, order: { 
            dtt_interacao_cartao: 'DESC' 
         }
      });
   }

   public async criarCartoesUsuario(listaCartoes: Cartao[]): Promise<Cartao> {
      return await this.repositorio.insert(listaCartoes);
   }

   public async pegarCartao(usuarioID: string, tipoCartao: string): Promise<Cartao | null> {
      return await this.repositorio.findOne({ where: { id_usuario : usuarioID, tipo_cartao: tipoCartao } });
   }

}