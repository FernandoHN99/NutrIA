import Alimento from '../entities/alimento';
import { ILike } from 'typeorm';
import { AppDataSource } from '../../database/data-source';

export default class AlimentoRepositorio {

   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(Alimento);
   }

   public async obterAlimentosDoUsuario(usuarioID: string): Promise<Alimento[]> {
      return await this.repositorio.find({
         where: {
            id_usuario: usuarioID,
            alimento_ativo: true
         },
         order: {
            alimento_verificado: 'DESC',
            nome_alimento: 'ASC'
         },
      });
   }

   public async obterAlimentosPorNome(nome: string, pegar: number, pular: number): Promise<Alimento[]> {
      return await this.repositorio.find({
         where: {
             nome_alimento: ILike(`%${nome}%`),
             alimento_ativo: true
         },
         order: {
            alimento_verificado: 'DESC',
            nome_alimento: 'ASC'
         },
         take: pegar,
         skip: pular
     });
   }

   public async obterAlimentoUsuario(idAlimento: number, usuarioID: string): Promise<Alimento> {
      return await this.repositorio.findOne({ 
         where: { 
            id_alimento: idAlimento,
            id_usuario: usuarioID,
         }
      });
   }

}