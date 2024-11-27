import { useQuery, useQueries } from '@tanstack/react-query';
import { obterUsuarioService } from '../services/usuarioService';
import { obterPerfilService } from '../services/perfilService';
import { obterConsumoUsuarioService } from '../services/alimentoConsumoService';
import { criarStrData } from '../../utils/utils';
import { obterRefeicaoService } from '../services/refeicaoService';
import { obterAlimentosFavoritosService } from '../services/alimentoFavoritoService';
import { obterDiasService } from '../services/diaService';

export function useUsuarioInfo(options = {}) {
   return useQuery({
      ...options,
      queryKey: ['usuarioInfo'],
      queryFn: () => obterUsuarioService(),
   });
}

export function usePerfisUsuario(options = {}) {
   return useQuery(
      {
         queryKey: ['perfisUsuario'],
         queryFn: () => obterPerfilService(),
         ...options
      }
   );
}

export function useConsumoAlimentos(options = {}) {
   return useQuery(
      {
         ...options,
         queryKey: ['consumoAlimentos'],
         queryFn: () =>
            obterConsumoUsuarioService({
               dataInicio: criarStrData(-30),
               dataFim: criarStrData(30),
            }),
      },
   );
}

export function useRefeicoesUsuario(options = {}) {
   return useQuery(
      {
         queryKey: ['refeicoesUsuario'],
         queryFn: () => obterRefeicaoService(),
         ...options
      })
}

export function useAlimentosFavoritos(options = {}) {
   return useQuery(
      {
         queryKey: ['alimentosFavoritos'],
         queryFn: () => obterAlimentosFavoritosService(),
         ...options
      })
}

export function useDiasUsuario(options = {}) {
   return useQuery(
      {
         queryKey: ['diasUsuario'],
         queryFn: () => obterDiasService(),
         ...options
      })
}