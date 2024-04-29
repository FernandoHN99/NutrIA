abstract class JsonResponse {
   public successo: boolean;
   public codigo: number;
   public mensagem: string;

   
   constructor(successo: boolean, codigo: number, mensagem: string) {
      this.successo = successo;
      this.codigo = codigo;
      this.mensagem = mensagem;
   }
}

class JsonReponseErro extends JsonResponse {
   public erro: any;

   public constructor(codigo: number, mensagem: string, erro: any) {
      super(false, codigo, mensagem);
      this.erro = erro;
   }

   static lancar(codigo: number, mensagem: string, erro: any = {}) {
      throw new JsonReponseErro(codigo, mensagem, erro);
   }
}

class JsonReponseSucesso extends JsonResponse{
   public data: any;

   constructor(codigo: number, mensagem: string, data: any = {}) {
      super(true, codigo, mensagem);
      this.data = data;
   }
}

export { JsonReponseErro, JsonReponseSucesso};