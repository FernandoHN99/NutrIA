
import AlimentoConsumido from "../entities/alimentoConsumido";
import { AppDataSource } from '../../database/data-source';

export default class AlimentoConsumidoRepositorio {

   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(AlimentoConsumido);
   }

   public async obterAlimentoConsumido(idAlimentoConsumido: number): Promise<AlimentoConsumido> {
      return await this.repositorio.findOne({ where: { id_alimento_consumido : idAlimentoConsumido }});
   }

   public async obterConsumoUsuario(usuarioID: string, dataInicio: string, dataFim: string): Promise<any[]> {
      return await this.repositorio.createQueryBuilder('ac')
         .select([
            'ac',
            'a.nome_alimento',
            'r.nome_refeicao',
         ])
         .innerJoin('ac.alimento', 'a')
         .innerJoin('ac.refeicao', 'r')
         .where('ac.id_usuario = :usuarioID', { usuarioID })
         .andWhere('ac.dt_dia >= :dataInicio', { dataInicio })
         .andWhere('ac.dt_dia <= :dataFim', { dataFim })
         .orderBy('ac.dt_dia', 'ASC')
         .orderBy('r.numero_refeicao', 'ASC')
         .getMany();
   }

}