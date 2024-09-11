import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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
import DiaConsumo from '../components/DiaConsumo';
import { roundJsonValues } from '../utils/utils';
import { encontrarPerfilPorData } from '../utils/formatters';

const HomeScreen = ({ navigation }: { navigation: any }) => {
   const [dataInicio, setDataInicio] = useState(criarStrData(-30));
   const [dataFim, setDataFim] = useState(criarStrData(30));
   const [diaSelecionado, setDiaSelecionado] = useState(criarStrData());
   const queryClient = useQueryClient()

   const { data, error, isLoading } = useQuery({
      queryKey: ['consumoAlimentos'],
      queryFn: () => obterConsumoUsuarioService({ dataInicio, dataFim }),
   })

   const consumoUsuarioDia = data?.filter((item: { dt_dia: string; }) => item.dt_dia === diaSelecionado)

   const perfisCached: any[] | undefined = queryClient.getQueryData(['perfisUsuario']);
   const perfilDia = perfisCached ? roundJsonValues(encontrarPerfilPorData(perfisCached, diaSelecionado)) : null;

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

   if (isLoading || !perfilDia) {
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
         <ScrollView>
            <DiaSumario perfilDia={perfilDia} infosDia={consumoUsuarioDia} />
            <DiaConsumo perfilDia={perfilDia} infosDia={consumoUsuarioDia}/>
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