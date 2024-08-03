import UsuarioRepositorio from '../repositories/usuarioRepositorio';
import Usuario from '../entities/usuario';
import { API_EXTERNAL_URL, SERVICE_KEY }  from '../../config/variaveis'
import { criarUsuarioObject } from '../schemas/usuario/criarUsuarioSchema';
import { atualizarUsuarioDadosObject } from '../schemas/usuario/atualizarUsuarioDadosSchema';
import { atualizarUsuarioContaObject } from '../schemas/usuario/atualizarUsuarioContaSchema';
import { efetuarLoginObject } from '../schemas/usuario/efetuarLoginSchema';
import { createClient } from '@supabase/supabase-js'
import { JsonReponseErro } from '../../utils/jsonReponses';
import Eventos from '../../utils/eventos';
export default class UsuarioService{

   private usuarioRepo: UsuarioRepositorio;
   private clienteSupabase: any;

   constructor() {
      this.usuarioRepo = new UsuarioRepositorio();
   }

   public async obterUsuarioPorID(usuarioID: string): Promise<Usuario> {
      let usuarioRetornado = await this.usuarioRepo.obterUsuarioPorID(usuarioID);
      if(!usuarioRetornado){
         JsonReponseErro.lancar(404, 'Usuário não encontrado');
      }
      return usuarioRetornado!;
   }

   public async obterContaPorID(contaId: string): Promise<any> {
      this.setClienteSupabase()
      const { data, error } = await this.clienteSupabase.auth.admin.getUserById(contaId);
      if(error || !data?.user?.id || !data?.user?.identities[0]?.email){
         JsonReponseErro.lancar(404, 'Conta não encontrada');
      }
      return { id: data.user.id, email: data.user.identities[0].email }
   }

   public async criarUsuario(id_conta: string, dadosUsuario: criarUsuarioObject): Promise<Usuario> {
      dadosUsuario.id_usuario = id_conta;
      const novoUsuario: Usuario = new Usuario(dadosUsuario);
      await novoUsuario.save();
      Eventos.emitir('usuarioCriado', novoUsuario.id_usuario);
      return novoUsuario;
   }

   public async criarConta(criarContaJSON: criarUsuarioObject): Promise<any> {
      this.setClienteSupabase()
      const { data, error } = await this.clienteSupabase.auth.admin.createUser({  
            ...criarContaJSON,  
            email_confirm: true
         });
      if(error || !data?.user?.id){
         if(error?.code.includes('email_exists')){
            JsonReponseErro.lancar(409, 'Email já cadastrado');
         }
         JsonReponseErro.lancar(500, 'Erro ao criar conta do usuário', error);
      }
      return data.user;
   }

   public async atualizarUsuarioDados(novosDadosUsuario: atualizarUsuarioDadosObject): Promise<any>{
      let usuario = await this.obterUsuarioPorID(novosDadosUsuario.id_usuario);
      usuario.atualizarDados(novosDadosUsuario);
      return await usuario.save();
   }

   public async atualizarUsuarioConta(novosDadosContaUsuario: atualizarUsuarioContaObject): Promise<{email: any}>{
      this.setClienteSupabase()
      const { data, error } = await this.clienteSupabase.auth.admin.updateUserById(
         novosDadosContaUsuario.id_usuario, { ...novosDadosContaUsuario});
      if(error || !data?.user?.id || !data?.user?.identities[0]?.email){
         JsonReponseErro.lancar(500, 'Erro ao atualizar conta do usuário', error);
      }
      return { email: data.user.identities[0].email };
   }

   public async fazerLogin(loginJSON: efetuarLoginObject): Promise<any>  {
      this.setClienteSupabase()
      const { data, error } = await this.clienteSupabase.auth.signInWithPassword(loginJSON);
      if(error || !data?.session){
         JsonReponseErro.lancar(401, 'Credenciais inválidas');
      }
      return data.session;
   }

   public async obterNovoTokenAcesso(refreshToken: string): Promise<any>  {
      this.setClienteSupabase()
      const { data, error } = await this.clienteSupabase.auth.refreshSession({ refresh_token: refreshToken })
      if(error || !data?.session){
         JsonReponseErro.lancar(401, 'Token não autorizado', error);
      }
      return data.session;
   }

   private setClienteSupabase(){
      this.clienteSupabase = createClient(API_EXTERNAL_URL, SERVICE_KEY);
   }
   
}


