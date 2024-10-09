import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopTabNavigator from '../TabNavigators/TopTabNavigator';
import { criarStrData, getResponsiveSizeWidth } from '../../utils/utils';
import LoadingScreen from '../../components/LoadingScreen';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../../styles/theme';
import { useAlimentosFavoritos, useConsumoAlimentos, usePerfisUsuario, useRefeicoesUsuario, useUsuarioInfo } from '../../api/httpState/usuarioData';
const Stack = createNativeStackNavigator();

const AuthenticatedNavigator = () => {


   const { data: usuarioInfo, error: errorUsuario, isLoading: isLoadingUsuario, refetch: refetchUsuario } = useUsuarioInfo();
   const { data: perfisUsuario, error: errorPerfis, isLoading: isLoadingPerfis, refetch: refetchPerfis } = usePerfisUsuario();
   const { data: consumoUsuario, error: errorConsumo, isLoading: isLoadingConsumo, refetch: refetchConsumo } = useConsumoAlimentos();
   const { data: refeicoesUsuario, error: errorRefeicoes, isLoading: isLoadingRefeicoes, refetch: refetchRefeicoes } = useRefeicoesUsuario();
   const { data: alimentosFavoritos, error: errorAlimentosFavoritos, isLoading: isLoadingAlimentosFavoritos, refetch: refetchAlimentosFavoritos } = useAlimentosFavoritos();


   if (isLoadingUsuario || isLoadingPerfis || isLoadingConsumo || isLoadingRefeicoes || isLoadingAlimentosFavoritos) {
      return <LoadingScreen loadingMessage="Carregando..." />;
   }

   if (errorUsuario || errorPerfis || errorConsumo || errorRefeicoes || errorAlimentosFavoritos) {

      const tentarNovamente = () => {
         if (errorUsuario) refetchUsuario();
         if (errorPerfis) refetchPerfis();
         if (errorConsumo) refetchConsumo();
         if (errorRefeicoes) refetchRefeicoes();
         if (errorAlimentosFavoritos) refetchAlimentosFavoritos();
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
