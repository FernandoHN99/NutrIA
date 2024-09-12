import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import TopTabNavigator from './AuthenticatedNavigator';
import LogoIcon from '../components/LogoIcon';
import globalStyles from '../styles/globalStyles';
import theme from '../styles/theme';
import { useQuery, useQueries } from '@tanstack/react-query';
import { obterUsuarioService } from '../api/services/usuarioService';
import { obterPerfilService } from '../api/services/perfilService';
import { obterRefeicaoService } from '../api/services/refeicaoService';
import RefeicaoScreen from '../screens/RefeicaoScreen';

const Stack = createNativeStackNavigator();

const AuthenticatedNavigator = () => {

   const [
      { data: usuarioInfo, error: errorUsuario, isLoading: isLoadingUsuario },
      { data: perfisUsuario, error: errorPerfis, isLoading: isLoadingPerfis },
      { data: refeicoesUsuario, error: errorRefeicoes, isLoading: isLoadingRefeicoes },
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
            queryKey: ['refeicoesUsuario'],
            queryFn: () => obterRefeicaoService(),
         },
      ],
   });

   return (
      <Stack.Navigator>
         <Stack.Screen
            name="MainTab"
            component={TopTabNavigator}
            options={{
               headerStyle: {
                  backgroundColor: theme.colors.backgroundColor,
               },
               headerTitle: () => (
                  <React.Fragment>
                     <LogoIcon widthPorcentageValue={10} />
                     <Text style={globalStyles.heading}>NutrIA</Text>
                  </React.Fragment>
               ),
               headerTitleAlign: 'center',
            }}
         />
      </Stack.Navigator>
   );
};

export default AuthenticatedNavigator;
