import { Request, Response, NextFunction } from 'express';
import JsonResponse from './jsonReponse';

export default class Util {

   static envolveFuncTryCatch(context: any, funcao: Function) {
      return async function (req: Request, res: Response, next: NextFunction) {
         let jsonOutput: JsonResponse;
         try {
            jsonOutput = await funcao.bind(context)(req, res, next);
            res.status(jsonOutput.code).json(jsonOutput);
         } catch (erro:any) {
            console.error('Erro:', erro);
            jsonOutput = JsonResponse.erro(500,  erro);
            res.status(jsonOutput.code).json(jsonOutput);
         }
      };
   }

   static validarData(stringDate:string): boolean {
      return !isNaN(Date.parse(stringDate));
  }
}