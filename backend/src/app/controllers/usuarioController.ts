import { Request, Response, NextFunction } from 'express';
import UsuarioService from '../services/usuarioService';
import { efetuarLoginSchema } from '../schemas/usuario/efetuarLoginSchema';
import { criarUsuarioSchema, criarUsuarioObject } from '../schemas/usuario/criarUsuarioSchema';
import { atualizarUsuarioContaSchema } from '../schemas/usuario/atualizarUsuarioContaSchema';
import { atualizarUsuarioDadosSchema } from '../schemas/usuario/atualizarUsuarioDadosSchema';
import { JsonReponseSucesso, JsonReponseErro } from '../../utils/jsonReponses';
import { obterNovoTokenAcessoSchema } from '../schemas/usuario/obterNovoTokenAcessoSchema';

export default class UsuarioController {

   private usuarioService: UsuarioService;

   constructor() {
      this.usuarioService = new UsuarioService();
   }

   public async obterUsuarioPorID(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const usuarioID: string = req.body.id_usuario;
      let retornoConta = await this.usuarioService.obterContaPorID(usuarioID);
      let retornoUsuario = await this.usuarioService.obterUsuarioPorID(usuarioID);
      return new JsonReponseSucesso(200, 'Usuário retornado com sucesso', {...retornoUsuario, email: retornoConta.email});
   }

   public async criarUsuario(req: Request, res: Response): Promise<JsonReponseSucesso> {
      const resultadoParse: any = criarUsuarioSchema.safeParse(req.body); 
      if (!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };
      const retornoContaCriada = await this.usuarioService.criarConta(resultadoParse.data);
      const retornoUsuarioCriacao =  await this.usuarioService.criarUsuario(retornoContaCriada.id, resultadoParse.data);
      const retornoLogin = await this.usuarioService.fazerLogin(resultadoParse.data)
      return new JsonReponseSucesso(201, 'Usuário criado com sucesso', { ...retornoLogin });
      
   }

   public async atualizarUsuarioConta(req: Request, res: Response): Promise<JsonReponseSucesso> {
      const resultadoParse: any = atualizarUsuarioContaSchema.safeParse(req.body);
      if (!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      }
      const retoronoUsuarioContaAtualizada = await this.usuarioService.atualizarUsuarioConta(resultadoParse.data)
      return new JsonReponseSucesso(200, 'Conta do usuário atualizado com sucesso', retoronoUsuarioContaAtualizada);
   }

   public async atualizarUsuarioDados(req: Request, res: Response): Promise<JsonReponseSucesso> {
      const resultadoParse: any = atualizarUsuarioDadosSchema.safeParse(req.body)
      if (!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      }
      const retoronoUsuarioDadosAtualizado = await this.usuarioService.atualizarUsuarioDados(resultadoParse.data);
      return new JsonReponseSucesso(200, 'Dados do usuário atualizados com sucesso', retoronoUsuarioDadosAtualizado);
   }

   public async fazerLogin(req: Request, res: Response): Promise<JsonReponseSucesso> {
      const resultadoParse: any = efetuarLoginSchema.safeParse(req.body);
      if (!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };

      const retornoLogin = await this.usuarioService.fazerLogin(resultadoParse.data);
      return new JsonReponseSucesso(200, 'Login efetuado com sucesso', retornoLogin);
   }
   
   public async obterNovoTokenAcesso(req: Request, res: Response): Promise<JsonReponseSucesso> {
      const resultadoParse: any = obterNovoTokenAcessoSchema.safeParse(req.body);
      if (!resultadoParse.success){
         JsonReponseErro.lancar(400, 'Token inválido');
      }
      let retornoToken = await this.usuarioService.obterNovoTokenAcesso(resultadoParse.data.refresh_token);
      return new JsonReponseSucesso(200, 'Token de acesso atualizado com sucesso', retornoToken);
   }
}
