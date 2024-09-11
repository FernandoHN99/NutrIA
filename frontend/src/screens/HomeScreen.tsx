import { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import DiaScroll from '../components/DiaScroll';
import theme from '../styles/theme';
import DiaSumario from '../components/DiaSumario';
// import MealList from '../components/MealList';
import { criarStrData } from '../utils/utils';
import LoadingScreen from '../components/LoadingScreen';
import { useQuery } from '@tanstack/react-query';
import { obterConsumoUsuarioService } from '../api/services/alimentoConsumoService';
import CustomAlert from '../components/CustomAlert';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const jsonDiaVazio = {
   totalKcal: 0,
   totalGordura: 0,
   totalCarboidrato: 0,
   totalProteina: 0
}

export const totalizarQuantidades = (alimentos: Array<any>) => {
   const resultado: { [key: string]: any } = { };
   for (let d = new Date(alimentos[alimentos.length - 1].dt_dia); d <= new Date(alimentos[0].dt_dia); d.setDate(d.getDate() + 1)) {
      const dt_dia = d.toISOString().split('T')[0];
      resultado[dt_dia] = { ...jsonDiaVazio };
   }
   return alimentos.reduce((acc, { dt_dia, kcal, qtde_gordura, qtde_carboidrato, qtde_proteina }) => {
      acc[dt_dia].totalKcal += kcal;
      acc[dt_dia].totalGordura += qtde_gordura;
      acc[dt_dia].totalCarboidrato += qtde_carboidrato;
      acc[dt_dia].totalProteina += qtde_proteina;
      return acc;
   }, resultado);
};


const HomeScreen = ({ navigation }: { navigation: any }) => {
   const [diaSelecionado, setDiaSelecionado] = useState(criarStrData());
   const queryClient = useQueryClient()

   const { data, error, isLoading } = useQuery({
      queryKey: ['consumoAlimentos'],
      queryFn: () => obterConsumoUsuarioService({ dataInicio: criarStrData(-30), dataFim: criarStrData(30) })
   })

   const consumosUsuarioSum = data ? totalizarQuantidades(data) : null;
   const infoDia = consumosUsuarioSum ? consumosUsuarioSum[diaSelecionado] : jsonDiaVazio;

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
      if (consumosUsuarioSum && !consumosUsuarioSum[diaSelecionado]) {
         handlerObterNovoConsumo(diaSelecionado)
      }
   }, [diaSelecionado]);

   if (isLoading) {
      return <LoadingScreen loadingMessage='Carregando...' />;
   }

   if (error) {
      CustomAlert('Tente Novamente', 'Erro ao recuperar seus dados', () => navigation.replace('MainTab'), 'Tentar novamente');
      return <LoadingScreen loadingMessage='Carregando...' />;
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
         <DiaSumario infoDia={infoDia} />
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