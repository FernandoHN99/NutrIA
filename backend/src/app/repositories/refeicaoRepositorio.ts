import Refeicao from '../entities/refeicao';
import { AppDataSource } from '../../database/data-source';

export default class RefeicaoRepositorio {

   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(Refeicao);
   }

   public async obterRefeicoesUsuario(usuarioID: string): Promise<Refeicao[]> {
      return await this.repositorio.find({ where: { id_usuario: usuarioID }, order: { numero_refeicao: 'ASC' }});
   }

   public async contarRefeicoesUsuario(usuarioID: string): Promise<number> {
      return await this.repositorio.count({ where: { id_usuario: usuarioID }});
   }

   public async obterRefeicao(id_usuario: string, numero_refeicao: number): Promise<Refeicao> {
      return await this.repositorio.findOne({ where: { id_usuario, numero_refeicao }});
   }

}