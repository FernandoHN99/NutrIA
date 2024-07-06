import Alimento from '../entities/alimento';
import { ILike } from 'typeorm';
import { AppDataSource } from '../../database/data-source';
import { atualizarAlimentoObject } from '../schemas/alimento/atualizarAlimentoSchema';
import CodigoDeBarras from '../entities/codigoDeBarras';

export default class AlimentoRepositorio {

   private repositorio: any;

   constructor() {
      this.repositorio = AppDataSource.getRepository(Alimento);
   }

   public async obterAlimentosDoUsuario(usuarioID: string): Promise<Alimento[]> {
      return await this.repositorio.find({
         where: {
            id_usuario: usuarioID,
            alimento_ativo: true
         },
         order: {
            alimento_verificado: 'DESC',
            nome_alimento: 'ASC'
         },
         relations: ['codigosDeBarras', 'tabelaNutricional']
      });
   }

   public async obterAlimentosPorNome(nome: string, pegar: number, pular: number): Promise<Alimento[]> {
      return await this.repositorio.find({
         where: {
             nome_alimento: ILike(`%${nome}%`),
             alimento_ativo: true
         },
         order: {
            alimento_verificado: 'DESC',
            nome_alimento: 'ASC'
         },
         relations: ['tabelaNutricional'],
         take: pegar,
         skip: pular
     });
   }

   public async obterAlimentoUsuario(idAlimento: number, usuarioID: string): Promise<Alimento> {
      return await this.repositorio.findOne({ 
         where: { 
            id_alimento: idAlimento,
            id_usuario: usuarioID,
         }
      });
   }

   public async obterAlimentoPorCodigoDeBarras(codigoDeBarras: string): Promise<Alimento | undefined> {
      return await this.repositorio.createQueryBuilder('a')
         .innerJoin('a.codigosDeBarras', 'cb')
         .where('cb.codigo = :codigoDeBarras', { codigoDeBarras })
         .getOne();
   }
   

   public async obterAlimentoUniqueVerificado(alimentoDados: atualizarAlimentoObject): Promise<Alimento>{
      return await this.repositorio.findOne({ 
         where: { 
            nome_alimento: alimentoDados.nome_alimento,
            estado_alimento: alimentoDados.estado_alimento,
            grupo_alimentar: alimentoDados.grupo_alimentar,
            marca_alimento: alimentoDados.marca_alimento,
            alimento_verificado: true
         }
      });
   }

   public async obterAlimentoPorID(idAlimento: number): Promise<Alimento>{
      return await this.repositorio.findOne({ 
         where: { 
            id_alimento: idAlimento,
         }
      });
   }
}