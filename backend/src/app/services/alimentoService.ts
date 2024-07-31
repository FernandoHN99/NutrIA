import AlimentoRepositorio from "../repositories/alimentoRepositorio";
import { buscarAlimentosOject } from "../schemas/alimento/buscarAlimentosSchema";
import { atualizarAlimentoObject } from '../schemas/alimento/atualizarAlimentoSchema';
import { criarAlimentoCompletoObject } from "../schemas/alimento/criarAlimentoCompletoSchema";
import { JsonReponseErro } from "../../utils/jsonReponses";
import Alimento from "../entities/alimento";
import TabelaNutricionalService from "./tabelaNutricionalService";

export default class AlimentoService{
   
   private alimentoRepo: AlimentoRepositorio;
   private tabelaNutricionalService: TabelaNutricionalService;

   constructor(){
      this.alimentoRepo = new AlimentoRepositorio()
      this.tabelaNutricionalService = new TabelaNutricionalService();
   }

   public async buscarAlimentos(buscarAlimentos: buscarAlimentosOject): Promise<Alimento[]>{
         return await this.alimentoRepo.obterAlimentosPorNome(
            buscarAlimentos.nome, 
            parseFloat(buscarAlimentos.pegar),
            parseFloat(buscarAlimentos.pular)
         );
   }

   public async obterAlimentosUsuario(usuarioID: string): Promise<Alimento[]>{
      return await this.alimentoRepo.obterAlimentosDoUsuario(usuarioID)
   }
   
   public async criarAlimento(dadosCriacaoJSON: criarAlimentoCompletoObject): Promise<{}>{
      const { tabelaNutricional: dadosTabelaNutricional, ...dadosAlimento } = dadosCriacaoJSON;
      const alimento = new Alimento(dadosAlimento);
      await alimento.save();
      dadosTabelaNutricional.id_alimento = alimento.id_alimento;
      const retornoCriacaoTabela = await this.tabelaNutricionalService.criarTabelaNutricional(dadosTabelaNutricional);
      return { ...alimento, tabelaNutricional: retornoCriacaoTabela };
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
      if(atualizarAlimento?.alimento_verificado === true){
         const alimentoJaVerificado = await this.alimentoRepo.obterAlimentoUniqueVerificado(atualizarAlimento);
         if(alimentoJaVerificado){
            JsonReponseErro.lancar(400, 'Não é possível verificar um alimento igual a outro que já foi verificado', 
               { id_alimento: alimentoJaVerificado.id_alimento }
            );
         }
      }
      alimento.atualizarDados(atualizarAlimento);
      return await alimento.save();
   }

   public async obterAlimentoPorCodigoDeBarras(codigoDeBarras: string): Promise<Alimento>{
      const alimento = await this.alimentoRepo.obterAlimentoPorCodigoDeBarras(codigoDeBarras);
      console.log(codigoDeBarras);
      if(!alimento){
         JsonReponseErro.lancar(404, 'Alimento não encontrado');
      }
      return alimento!;
   }

   public async obterAlimentoPorID(idAlimento: number): Promise<Alimento>{
      return await this.alimentoRepo.obterAlimentoPorID(idAlimento);
   }

}