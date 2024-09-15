import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DiaScroll from '../components/DiaScroll';
import theme from '../styles/theme';
import DiaSumario from '../components/DiaSumario';
import { criarStrData } from '../utils/utils';
import { obterConsumoUsuarioService } from '../api/services/alimentoConsumoService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DiaConsumo from '../components/DiaConsumo';
import { encontrarPerfilPorData, filtrarConsumoDia, filtrarRefeicoesAtivas } from '../utils/formatters';

const HomeScreen = ({ navigation }: { navigation: any }) => {
   
   const [dataInicio, setDataInicio] = useState(criarStrData(-30));
   const [dataFim, setDataFim] = useState(criarStrData(30));
   const [diaSelecionado, setDiaSelecionado] = useState(criarStrData());

   const queryClient = useQueryClient()

   const consumoAlimentosCached: any[] | undefined = queryClient.getQueryData(['consumoAlimentos']);
   const refeicoesCached: any[] | undefined = queryClient.getQueryData(['refeicoesUsuario']);
   const perfisCached: any[] | undefined = queryClient.getQueryData(['perfisUsuario']);

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
      }else if(new Date (diaSelecionado) > new Date(dataFim)) {
         setDataFim(diaSelecionado)
         handlerObterNovoConsumo(diaSelecionado)
      }
   }, [diaSelecionado]);

   if(!consumoUsuarioDia || !perfilDia || !refeicoesAtivas) {
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
            <DiaConsumo navigation ={navigation} perfilDia={perfilDia} infosDia={consumoUsuarioDia} refeicoesDiaAtivas={refeicoesAtivas}/>
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