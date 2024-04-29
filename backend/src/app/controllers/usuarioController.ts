import { Request, Response, NextFunction } from 'express';
import UsuarioService from '../services/usuarioService';
import validate  from 'uuid-validate'
import { efetuarLoginSchema } from '../schemas/usuario/efetuarLoginSchema';
import { criarUsuarioSchema, criarUsuarioObject } from '../schemas/usuario/criarUsuarioSchema';
import { atualizarUsuarioSchema } from '../schemas/usuario/atualizarUsuarioSchema';
import { atualizarUsuarioContaSchema } from '../schemas/usuario/atualizarUsuarioContaSchema ';
import { atualizarUsuarioDadosSchema } from '../schemas/usuario/atualizarUsuarioDadosSchema';
import { JsonReponseSucesso, JsonReponseErro } from '../../utils/jsonReponses';


export default class UsuarioController {

   private usuarioService: UsuarioService;

   constructor() {
      this.usuarioService = new UsuarioService();
   }

   public async obterUsuarioPorID(req: Request, res: Response): Promise<JsonReponseSucesso>{
      const usuarioID: string = req.params.id;
      if(!validate(usuarioID)){
         JsonReponseErro.lancar(400, 'ID do usuário inválido');
      }
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
      const retornoCriacao =  await this.usuarioService.criarUsuario(retornoContaCriada.id, resultadoParse.data);
      return new JsonReponseSucesso(201, 'Usuário criado com sucesso', {id_usuario: retornoContaCriada.id});
   }

   public async atualizarUsuario(req: Request, res: Response): Promise<JsonReponseSucesso> {
      const resultadoParse: any = atualizarUsuarioSchema.safeParse(req.body);
      if (!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      }
      let retoronoUsuarioDadosAtualizado, retoronoUsuarioContaAtualizada;
      const novosDadosUsuario = resultadoParse.data;
      if(atualizarUsuarioDadosSchema.safeParse(req.body).success){
         retoronoUsuarioDadosAtualizado = await this.usuarioService.atualizarUsuarioDados(novosDadosUsuario);
      }
      if(atualizarUsuarioContaSchema.safeParse(req.body).success){
         retoronoUsuarioContaAtualizada = await this.usuarioService.atualizarUsuarioConta(novosDadosUsuario)
      }
      return new JsonReponseSucesso(200, 'Usuário Atualizado com sucesso', {...retoronoUsuarioDadosAtualizado, email: retoronoUsuarioContaAtualizada?.email});
   }

   public async fazerLogin(req: Request, res: Response): Promise<JsonReponseSucesso> {
      const resultadoParse: any = efetuarLoginSchema.safeParse(req.body);
      if (!resultadoParse.success){
         JsonReponseErro.lancar(400, 'JSON inválido', resultadoParse.error);
      };

      let retornoLogin = await this.usuarioService.fazerLogin(resultadoParse.data);
      return new JsonReponseSucesso(200, 'Login efetuado com sucesso', retornoLogin);
   }

   public async obterTodosUsuarios(req: Request, res: Response): Promise<JsonReponseSucesso> {
      let retornoUsuarios = await this.usuarioService.obterTodosUsuarios();
      return new JsonReponseSucesso(200, 'Usuários retornados com sucesso', retornoUsuarios);
   }

   public async teste(req: Request, res: Response){
      let retornoTeste = await this.usuarioService.teste();
      return new JsonReponseSucesso(200, 'TESTE', retornoTeste);
   }
   
}
