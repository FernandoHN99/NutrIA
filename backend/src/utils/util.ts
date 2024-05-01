import { Request, Response, NextFunction } from 'express';
import { JsonReponseSucesso, JsonReponseErro } from './jsonReponses';

export default class Util {

   static envolveFuncTryCatch(context: any, funcao: Function) {
      return async function (req: Request, res: Response, next: NextFunction) {
         let responseSucesso: JsonReponseSucesso;
         try {
            responseSucesso = await funcao.bind(context)(req, res, next);
            res.status(responseSucesso.codigo).json(responseSucesso);
         } catch (erro: any) {
            if(erro instanceof JsonReponseErro){
               res.status(erro.codigo).json(erro);
            }else{
               res.status(500).json({sucesso: false, codigo: 500, mensagem: 'Erro interno no servidor' , erro } );
            }
         }
      };
   }

   static validarData(stringDate: string): boolean {
      return !isNaN(Date.parse(stringDate));
  }

  static validarString(string: string): boolean {
      return string.length > 0;
  }

  static returnarInstaciasRotas(importedModules: any): [] {
      let rotas: any = [];
      for (let key in importedModules) {
         rotas.push(new importedModules[key].default());
      }
      return rotas;
  }

  static capitalize(frase: string){
      return frase.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  }

}