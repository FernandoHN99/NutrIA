import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import AlimentoConsumidoService from '../services/alimentoConsumidoService';
import { buscarAlimentosConsumidosSchema } from '../schemas/alimentoConsumido/buscarAlimentosConsumidosSchema';
import { criarAlimentoConsumidoSchema } from '../schemas/alimentoConsumido/criarAlimentoConsumidoSchema';
import { atualizarAlimentoConsumidoSchema } from '../schemas/alimentoConsumido/atualizarAlimentoConsumidoSchema';
import { deletarAlimentoConsumidoSchema } from '../schemas/alimentoConsumido/deletarAlimentoConsumido';
import Util from '../../utils/util';

export default class AlimentoConsumidoController {
   private alimentoConsumidoService: AlimentoConsumidoService;

   constructor() {
      this.alimentoConsumidoService = new AlimentoConsumidoService();
   }

   public async obterConsumoUsuario(req: Request, res: Response): Promise<JsonReponseSucesso> {
      const resultadoParse: any = buscarAlimentosConsumidosSchema.safeParse(req.query)
      if (!resultadoParse.success) {
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      }
   const retornoConsumoUsuario = await this.alimentoConsumidoService.obterConsumoUsuario(req.body.id_usuario, resultadoParse.data);
      return new JsonReponseSucesso(200, 'Consumo do usuário retornado com sucesso', retornoConsumoUsuario);
   }

   public async cadastrarAlimentoConsumido(req: Request, res: Response): Promise<JsonReponseSucesso> {
      let resultadoParse: any = criarAlimentoConsumidoSchema.safeParse(req.body)
      if (!resultadoParse.success) {
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      }
      const retornoCriarAlimentoConsumido = await this.alimentoConsumidoService.cadastrarAlimentoConsumido(resultadoParse.data);
      return new JsonReponseSucesso(201, 'Consumo do usuário cadastrado com sucesso', retornoCriarAlimentoConsumido);
   }

   public async atualizarAlimentoConsumido(req: Request, res: Response): Promise<JsonReponseSucesso> {
      let resultadoParse: any = atualizarAlimentoConsumidoSchema.safeParse(req.body)
      if (!resultadoParse.success) {
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      }
      const retornoCriarAlimentoConsumido = await this.alimentoConsumidoService.atualizarAlimentoConsumido(resultadoParse.data);
      return new JsonReponseSucesso(201, 'Consumo do usuário atualizado com sucesso', retornoCriarAlimentoConsumido);
   }

   public async deletarAlimentoConsumido(req: Request, res: Response): Promise<JsonReponseSucesso> {
      let resultadoParse: any = deletarAlimentoConsumidoSchema.safeParse(req.body)
      if (!resultadoParse.success) {
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      }
      const retornoDeletarAlimentoConsumido = await this.alimentoConsumidoService.deletarAlimentoConsumido(resultadoParse.data);
      return new JsonReponseSucesso(200, 'Consumo do usuário deletado com sucesso');
   }


}