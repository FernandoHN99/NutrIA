import { Request, Response } from 'express';
import UsuarioService from '../services/usuarioService';
import JsonResponse from '../../utils/jsonReponse';
import validate  from 'uuid-validate'
import { usuarioSchema, criarUsuarioInputDTO, criarUsuarioOutputDTO } from '../schemas/criarUsuarioSchema';


export default class UsuarioController {

   private usuarioService: UsuarioService;

   constructor() {
      this.usuarioService = new UsuarioService();
   }

   public async obterUsuarioPorID(req: Request, res: Response): Promise<JsonResponse>{
      const usuarioID: string = req.params.id;
      if(!validate(usuarioID)){
         return JsonResponse.erro(400, 'ID do usuário inválido');
      }
      let retornoUsuario: any = await this.usuarioService.obterUsuarioPorID(usuarioID);
      if(!retornoUsuario){
         return JsonResponse.erro(404, 'Usuário não encontrado');
      }
      return JsonResponse.sucesso(200, retornoUsuario);
   }

   public async criarUsuario(req: Request, res: Response): Promise<JsonResponse> {
      let reqCriarUsuario: criarUsuarioInputDTO = req.body;
      const resultParse = usuarioSchema.safeParse(reqCriarUsuario)
      if (!resultParse.success){
         return JsonResponse.sucesso(400, resultParse.error);
      };
      let outputParser:criarUsuarioOutputDTO = resultParse.data;
      let retornoUsuarioCriado = await this.usuarioService.criarUsuario(outputParser);
      return JsonResponse.sucesso(201, {retornoUsuarioCriado});
   }

   // public async obterUsuarios(req: Request, res: Response): Promise<void> {
   //    try {
   //       let retornoUsuarios: any = await this.usuarioService.obterUsuarios();
   //       res.status(200).json({ message: retornoUsuarios });

   //    } catch (erro) {
   //       res.status(500).json({ Error: erro });
   //    }
   // }

}
