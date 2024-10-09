import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DiaScroll from '../../../components/Home/DiaScroll';
import theme from '../../../styles/theme';
import DiaSumario from '../../../components/Home/DiaSumario';
import { criarStrData } from '../../../utils/utils';
import { obterConsumoUsuarioService } from '../../../api/services/alimentoConsumoService';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import DiaConsumo from '../../../components/Home/DiaConsumo';
import { encontrarPerfilPorData, filtrarConsumoDia, filtrarRefeicoesAtivas } from '../../../utils/formatters';
import { useConsumoAlimentos, useRefeicoesUsuario, usePerfisUsuario } from '../../../api/httpState/usuarioData';

const HomeScreen = ({ navigation }: { navigation: any }) => {

   const [dataInicio, setDataInicio] = useState(criarStrData(-30));
   const [dataFim, setDataFim] = useState(criarStrData(30));
   const [diaSelecionado, setDiaSelecionado] = useState(criarStrData());

   const queryClient = useQueryClient()

   const { data: consumoAlimentosCached } = useConsumoAlimentos({enabled: false});
   const { data: refeicoesCached } = useRefeicoesUsuario({enabled: false});
   const { data: perfisCached } = usePerfisUsuario({enabled: false});

   const consumoUsuarioDia = filtrarConsumoDia(consumoAlimentosCached, diaSelecionado);
   const perfilDia = encontrarPerfilPorData(perfisCached, diaSelecionado);
   const refeicoesAtivas = filtrarRefeicoesAtivas(refeicoesCached);

   const { mutateAsync: obterConsumoUsuarioServiceFn, isPending } = useMutation({
      mutationFn: obterConsumoUsuarioService,
      onSuccess(data) {
         queryClient.setQueryData(['consumoAlimentos'], (oldData: any[]) => {
            return [...oldData, ...data]
         })
      }
   })

   async function handlerObterNovoConsumo(diaSelecionado: string) {
      await obterConsumoUsuarioServiceFn({
         dataInicio: diaSelecionado,
         dataFim: diaSelecionado
      })
   }

   useEffect(() => {
      if (new Date(diaSelecionado) < new Date(dataInicio)) {
         setDataInicio(diaSelecionado)
         handlerObterNovoConsumo(diaSelecionado)
      } else if (new Date(diaSelecionado) > new Date(dataFim)) {
         setDataFim(diaSelecionado)
         handlerObterNovoConsumo(diaSelecionado)
      }
   }, [diaSelecionado]);

   if (!consumoUsuarioDia || !perfilDia || !refeicoesAtivas) {
      return null;
   }

   if (isPending) {
      return (
         <View style={styles.container}>
            <DiaScroll diaSelecionado={diaSelecionado} setDiaSelecionado={setDiaSelecionado} />
         </View>
      );
   }

   return (
      <View style={styles.container}>
         <DiaScroll diaSelecionado={diaSelecionado} setDiaSelecionado={setDiaSelecionado} />
         <ScrollView showsVerticalScrollIndicator={false}>
            <DiaSumario perfilDia={perfilDia} infosDia={consumoUsuarioDia} />
            <DiaConsumo navigation={navigation} perfilDia={perfilDia} diaSelecionado={diaSelecionado} infosDia={consumoUsuarioDia} refeicoesDiaAtivas={refeicoesAtivas} />
         </ScrollView>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,
   },
});

export default HomeScreen;