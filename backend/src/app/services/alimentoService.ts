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
      if(buscarAlimentos.nome){
         return await this.alimentoRepo.obterAlimentosPorNome(
            buscarAlimentos.nome, 
            buscarAlimentos.pegar, 
            buscarAlimentos.pular
         );
      }
      return await this.alimentoRepo.obterAlimentos(buscarAlimentos.pegar, buscarAlimentos.pular);
   }

   public async obterAlimentosUsuario(usuarioID: string): Promise<Alimento[]>{
      return await this.alimentoRepo.obterAlimentosDoUsuario(usuarioID)
   }
   
   public async criarAlimento(criarAlimento: criarAlimentoObject): Promise<any>{
      const alimento = new Alimento(criarAlimento);
      return await alimento.save();
   }

   public async obterAlimentoPorId(id_alimento: number): Promise<Alimento>{
      const alimento = await this.alimentoRepo.obterAlimentoPorId(id_alimento);
      if(!alimento){
         JsonReponseErro.lancar(404, 'Alimento não encontrado');
      }
      return alimento;
   }

   public async atualizarAlimento(atualizarAlimento: atualizarAlimentoObject): Promise<Alimento>{
      const alimento = await this.obterAlimentoPorId(atualizarAlimento.id_alimento);
      if(!alimento){
         JsonReponseErro.lancar(404, 'Alimento não encontrado');
      }
      else if(alimento.id_criador !== atualizarAlimento.id_usuario){
         JsonReponseErro.lancar(403, 'Usuário não tem permissão para atualizar esse alimento');
      }
      else if(!alimento.alimento_ativo){
         JsonReponseErro.lancar(400, 'Alimento inativo, não é possível atualizar');
      }
      else if(alimento.alimento_verificado){
         JsonReponseErro.lancar(400, 'Alimento já verificado, não é possível atualizar');
      }
      alimento.atualizar(atualizarAlimento);
      return await alimento.save();
   }

}