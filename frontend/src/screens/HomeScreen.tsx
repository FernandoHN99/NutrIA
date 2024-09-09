import { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import DiaScroll from '../components/DiaScroll';
import theme from '../styles/theme';
import DiaSumario from '../components/DiaSumario';
import MealList from '../components/MealList';
import { criarStrData } from '../utils/utils';
import LoadingScreen from '../components/LoadingScreen';
import { useQuery } from '@tanstack/react-query';
import { obterConsumoUsuarioService } from '../api/services/alimentoConsumoService';
import { totalizarQuantidades } from '../utils/utils';
import CustomAlert from '../components/CustomAlert';
import { useMutation, useQueryClient } from '@tanstack/react-query';


const jsonDiaVazio = {
   totalKcal: 0,
   totalGordura: 0,
   totalCarboidrato: 0,
   totalProteina: 0
}

const HomeScreen = ({ navigation }: { navigation: any }) => {
   const [diaSelecionado, setDiaSelecionado] = useState(criarStrData());
   const [consumoUsuario, setConsumoUsuario] = useState(null);
   const queryClient = useQueryClient()

   const { data, error, isLoading } = useQuery({
      queryKey: ['consumoAlimentos'],
      queryFn: () => obterConsumoUsuarioService({ dataInicio: criarStrData(-30), dataFim: criarStrData(30) })
   })

   useEffect(() => {
      if (error) {
         CustomAlert('Erro', 'Erro ao obter seu dados.')
      }
   }, [error]);


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
      if (data) {
         const retornoCosumoTratado = totalizarQuantidades(data);
         setConsumoUsuario(retornoCosumoTratado)
      }
   }, [data]);

   useEffect(() => {
      if (consumoUsuario && !consumoUsuario[diaSelecionado]) {
         handlerObterNovoConsumo(diaSelecionado)
      }
   }, [diaSelecionado]);


   if (isLoading || error) {
      return <LoadingScreen loadingMessage='Carregando...' />;
   }
   
   if (isPending) {
      return (
         <View style={styles.container}>
            <DiaScroll diaSelecionado={diaSelecionado} setDiaSelecionado={setDiaSelecionado} />
         </View>
      );
   }
   
   const infoDia = consumoUsuario && consumoUsuario[diaSelecionado] ? consumoUsuario[diaSelecionado] : jsonDiaVazio;
   
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