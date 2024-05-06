import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import validate  from 'uuid-validate'
import DiaService from '../services/diaService';
import { salvarDiaSchema } from '../schemas/dia/salvarDiaSchema';

export default class DiaController{
   private diaService: DiaService;

   constructor(){
      this.diaService = new DiaService();
   }

   public async obterDiasUsuario(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const usuarioID: string = req.params.id_usuario;
      if(!validate(usuarioID)){
         JsonReponseErro.lancar(400, 'ID do usuário inválido');
      }
      const retornoDias = await this.diaService.obterDiasUsuario(usuarioID);
      return new JsonReponseSucesso(200, 'Dias retornados com sucesso', retornoDias);
   }

   public async salvarDia(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = salvarDiaSchema.safeParse(req.body); 
      if (!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      const novoDia = await this.diaService.salvarDia(resultadoParse.data);
      return new JsonReponseSucesso(200, 'Dia salvo com sucesso', novoDia);
   }

}