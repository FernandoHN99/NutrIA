import AlimentoRepositorio from "../repositories/alimentoRepositorio";
import { buscarAlimentosOject } from "../schemas/alimento/buscarAlimentosSchema";
import { criarAlimentoObject } from "../schemas/alimento/criarAlimentoSchema";
import { atualizarAlimentoObject } from '../schemas/alimento/atualizarAlimentoSchema';
import { JsonReponseErro } from "../../utils/jsonReponses";
import Alimento from "../entities/alimento";

export default class AlimentoService{
   
   private alimentoRepo: AlimentoRepositorio;

   constructor(){
      this.alimentoRepo = new AlimentoRepositorio()
   }

   public async obterAlimentos(buscarAlimentos: buscarAlimentosOject): Promise<Alimento[]>{
         return await this.alimentoRepo.obterAlimentosPorNome(
            buscarAlimentos.nome, 
            parseFloat(buscarAlimentos.pegar),
            parseFloat(buscarAlimentos.pular));
   }

   public async obterAlimentosUsuario(usuarioID: string): Promise<Alimento[]>{
      return await this.alimentoRepo.obterAlimentosDoUsuario(usuarioID)
   }
   
   public async criarAlimento(criarAlimento: criarAlimentoObject): Promise<any>{
      const alimento = new Alimento(criarAlimento);
      return await alimento.save();
   }

   private async obterAlimentoUsuario(idAlimento: number, usuarioID: string): Promise<Alimento>{
      const alimento = await this.alimentoRepo.obterAlimentoUsuario(idAlimento, usuarioID);
      if(!alimento){
         JsonReponseErro.lancar(404, 'Alimento não encontrado');
      }
      return alimento;
   }

   public async atualizarAlimento(atualizarAlimento: atualizarAlimentoObject): Promise<Alimento>{
      const alimento = await this.obterAlimentoUsuario(atualizarAlimento.id_alimento, atualizarAlimento.id_usuario);
      if(alimento.alimento_verificado){
         JsonReponseErro.lancar(400, 'Alimento já verificado, não é possível atualizar');
      }
      alimento.atualizarDados(atualizarAlimento);
      return await alimento.save();
   }

   public async obterAlimentoPorCodigoDeBarras(codigoDeBarras: string): Promise<Alimento>{
      const alimento = await this.alimentoRepo.obterAlimentoPorCodigoDeBarras(codigoDeBarras);
      if(!alimento){
         JsonReponseErro.lancar(404, 'Alimento não encontrado');
      }
      return alimento;
   }

}