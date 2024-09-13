import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopTabNavigator from './TopTabNavigator';
import { useQuery, useQueries } from '@tanstack/react-query';
import { obterUsuarioService } from '../api/services/usuarioService';
import { obterPerfilService } from '../api/services/perfilService';
import { obterRefeicaoService } from '../api/services/refeicaoService';
import { obterConsumoUsuarioService } from '../api/services/alimentoConsumoService';
import { criarStrData, getResponsiveSizeWidth } from '../utils/utils';
import LoadingScreen from '../components/LoadingScreen';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../styles/theme';

const Stack = createNativeStackNavigator();

const AuthenticatedNavigator = () => {

   const [
      { data: usuarioInfo, error: errorUsuario, isLoading: isLoadingUsuario, refetch: refetchUsuario },
      { data: perfisUsuario, error: errorPerfis, isLoading: isLoadingPerfis, refetch: refetchPerfis },
      { data: consumoUsuario, error: errorConsumo, isLoading: isLoadingConsumo, refetch: refetchConsumo },
      { data: refeicoesUsuario, error: errorRefeicoes, isLoading: isLoadingRefeicoes, refetch: refetchRefeicoes },
   ] = useQueries({
      queries: [
         {
            queryKey: ['usuarioInfo'],
            queryFn: () => obterUsuarioService(),
         },
         {
            queryKey: ['perfisUsuario'],
            queryFn: () => obterPerfilService(),
         },
         {
            queryKey: ['consumoAlimentos'],
            queryFn: () =>
               obterConsumoUsuarioService({
                  dataInicio: criarStrData(-30),
                  dataFim: criarStrData(30),
               }),
         },
         {
            queryKey: ['refeicoesUsuario'],
            queryFn: () => obterRefeicaoService(),
         },
      ],
   });

   if (isLoadingUsuario || isLoadingPerfis || isLoadingConsumo || isLoadingRefeicoes) {
      return <LoadingScreen loadingMessage="Carregando..." />;
   }

   if (errorUsuario || errorPerfis || errorConsumo || errorRefeicoes) {

      const tentarNovamente = () => {
         if (errorUsuario) refetchUsuario();
         if (errorPerfis) refetchPerfis();
         if (errorConsumo) refetchConsumo();
         if (errorRefeicoes) refetchRefeicoes();
      };

      return (
         <View style={styles.erroContainer}>
            <Text style={styles.textErro}>Erro ao recuperar seus dados!</Text>
            <TouchableOpacity style={styles.buttonErro} onPress={tentarNovamente}>
               <Text style={styles.textButtonErro} >Tentar Novamente</Text>
            </TouchableOpacity>
         </View>
      );
   };

   return (
      <Stack.Navigator>
         <Stack.Screen
            name="TopTabNavigator"
            component={TopTabNavigator}
            options={{
               headerShown: false,
            }}
         />
      </Stack.Navigator>
   );
};

const styles = StyleSheet.create({
   erroContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.backgroundColor,
   },
   textErro: {
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeWidth(5),
      color: theme.colors.color05,
   },
   buttonErro: {
      marginTop: getResponsiveSizeWidth(2),
      padding: getResponsiveSizeWidth(3),
      backgroundColor: theme.colors.color05,
      borderRadius: 20,
   },
   textButtonErro: {
      fontFamily: 'NotoSans-Bold',
      fontSize: getResponsiveSizeWidth(4),
      color: theme.colors.color01
   }
});

export default AuthenticatedNavigator;
