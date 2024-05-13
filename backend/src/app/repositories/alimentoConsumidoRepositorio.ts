
import AlimentoConsumido from "../entities/alimentoConsumido";
import { AppDataSource } from '../../database/data-source';

export default class AlimentoConsumidoRepositorio{

   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(AlimentoConsumido);
   }

   public async obterConsumoUsuario(usuarioID: string, dataInicio: string, dataFim: string): Promise<any[]> {
      const query = `
      SELECT ac.dt_dia,  
         r.nome_refeicao, 
         a.nome_alimento, 
         a.id_alimento, 
         ac.unidade_medida, 
         ac.porcao_padrao, 
         ac.qtde_utilizada, 
         ac.qtde_proteina, 
         ac.qtde_carboidrato, 
         ac.qtde_gordura, 
         ac.qtde_alcool
      FROM
         alimento_consumido ac
      JOIN alimento a 
         ON ac.id_alimento = a.id_alimento
      JOIN refeicao r 
         ON r.numero_refeicao = ac.numero_refeicao 
         AND r.id_usuario = ac.id_usuario
      WHERE
         ac.id_usuario = '${usuarioID}'
         AND ac.dt_dia >= '${dataInicio}'
         AND ac.dt_dia <= '${dataFim}'   
      ORDER BY 
         ac.dt_dia ASC, 
         r.numero_refeicao ASC;
      `;
      return await this.repositorio.query(query);
   }

}