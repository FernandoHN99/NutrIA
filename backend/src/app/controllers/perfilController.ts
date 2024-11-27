import { Request, Response } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from "../../utils/jsonReponses";
import { criarPerfilSchema } from '../schemas/perfil/criarPerfilSchema';
import { atualizarPerfilSchema } from '../schemas/perfil/atualizarPerfilSchema';
import PerfilService from '../services/perfilService';

export default class PerfilController{
   private perfilService: PerfilService;

   constructor(){
      this.perfilService = new PerfilService();
   }

   public async obterPerfisUsuario(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const retornoPerfis = await this.perfilService.obterPerfisUsuario(req.body.id_usuario);
      return new JsonReponseSucesso(200, 'Perfis retornados com sucesso', retornoPerfis);
   }

   public async criarPerfil(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = criarPerfilSchema.safeParse(req.body);
      if(!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      const retornoCriarPerfil = await this.perfilService.criarPerfil(resultadoParse.data);
      return new JsonReponseSucesso(201, 'Perfil criado com sucesso', retornoCriarPerfil);
   }

   public async atualizarPerfil(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const resultadoParse: any = atualizarPerfilSchema.safeParse(req.body);
      if(!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      const retornoAtualizarPerfil = await this.perfilService.atualizarPerfil(resultadoParse.data);
      return new JsonReponseSucesso(200, 'Perfil atualizado com sucesso', retornoAtualizarPerfil);
   }

}