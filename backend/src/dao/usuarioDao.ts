import BancoDeDados from '../config/bancoDeDados';

export default class UsuarioDao {
   private bancoDeDados: BancoDeDados;

   constructor() {
      this.bancoDeDados = BancoDeDados.obterInstancia();
   }

   async obterUsuarioPorID(usuarioID: string): Promise<any> {
      const query = 'SELECT * FROM usuario WHERE id_usuario = $1';
      return this.bancoDeDados.obterConexao().oneOrNone(query, usuarioID);
   }
}  