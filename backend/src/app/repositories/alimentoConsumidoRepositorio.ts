
import AlimentoConsumido from "../entities/alimentoConsumido";
import { AppDataSource } from '../../database/data-source';

export default class AlimentoConsumidoRepositorio {

   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(AlimentoConsumido);
   }

   public async obterAlimentoConsumidoPorId(idAlimentoConsumido: number): Promise<AlimentoConsumido> {
      return await this.repositorio.createQueryBuilder('ac')
         .select([
            'ac',
            'a.nome_alimento',
            'a.estado_alimento',
            'r.nome_refeicao',
            'tb'
         ])
         .leftJoin('ac.alimento', 'a')
         .leftJoin('ac.refeicao', 'r')
         .leftJoin('a.tabelasNutricionais', 'tb')
         .where('ac.id_alimento_consumido = :idAlimentoConsumido', { idAlimentoConsumido })
         .getOne();
   }

   public async obterAlimentosConsumidosPorId(idsAlimentoConsumidos: number[]): Promise<AlimentoConsumido[]> {
      return await this.repositorio.createQueryBuilder('ac')
         .select([
            'ac',
            'a.nome_alimento',
            'a.estado_alimento',
            'r.nome_refeicao',
            'tb'
         ])
         .leftJoin('ac.alimento', 'a')
         .leftJoin('ac.refeicao', 'r')
         .leftJoin('a.tabelasNutricionais', 'tb')

         .where('ac.id_alimento_consumido IN (:...idsAlimentoConsumidos)', { idsAlimentoConsumidos })
         .getMany();
   }

   public async obterAlimentoConsumido(idAlimentoConsumido: number, usuarioID: string): Promise<AlimentoConsumido> {
      return await this.repositorio.findOne({ 
         where: { 
            id_alimento_consumido : idAlimentoConsumido, 
            id_usuario: usuarioID
         }
      });
   }

   public async obterConsumoUsuario(usuarioID: string, dataInicio: string, dataFim: string): Promise<any[]> {
      return await this.repositorio.createQueryBuilder('ac')
         .select([
            'ac',
            'a.nome_alimento',
            'a.estado_alimento',
            'r.nome_refeicao',
            'tb'
         ])
         .leftJoin('ac.alimento', 'a')
         .leftJoin('ac.refeicao', 'r')
         .leftJoin('a.tabelasNutricionais', 'tb')
         .where('ac.id_usuario = :usuarioID', { usuarioID })
         .andWhere('ac.dt_dia >= :dataInicio', { dataInicio })
         .andWhere('ac.dt_dia <= :dataFim', { dataFim })
         .orderBy('a.nome_alimento', 'ASC')
         .orderBy('r.numero_refeicao', 'ASC')
         .orderBy('ac.dt_dia', 'DESC')
         .getMany();
   }

   public async inserirAlimentosConsumidos(listaAlimentosConsumidos: AlimentoConsumido[]): Promise <AlimentoConsumido[]> {
      return await this.repositorio.save(listaAlimentosConsumidos);
   }


}