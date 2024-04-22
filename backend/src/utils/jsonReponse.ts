export default class JsonResponse {
   successo: boolean;
   code: number;
   data: any;
   erro: string | null;

   private constructor(successo: boolean, code:number, data: any, erro: any = null) {
      this.successo = successo;
      this.code = code;
      this.data = data || {};
      this.erro = erro;
   }

   static sucesso(code: number, data: any): JsonResponse {
      return new JsonResponse(true, code, data);
   }

   static erro(code: number, error: any): JsonResponse {
      return new JsonResponse(false, code, {}, error);
   }
}