
import Cartao from "../entities/cartao";
import { AppDataSource } from '../../database/data-source';

export default class CartaoRepositorio{

   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(Cartao);
   }

   public async pegarCartoesUsuario(usuarioID: string): Promise<Cartao | null> {
      return await this.repositorio.find({ where: { id_usuario : usuarioID } });
   }

   public async criarCartaoUsuario(listaCartoes: Cartao[]): Promise<Cartao> {
      return await this.repositorio.insert(listaCartoes);
   }

}