import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getResponsiveSizeHeight } from '../utils/utils';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useQueries } from '@tanstack/react-query';
import { obterUsuarioService } from '../api/services/usuarioService';
import { obterPerfilService } from '../api/services/perfilService';
import { obterRefeicaoService } from '../api/services/refeicaoService';
import { obterConsumoUsuarioService } from '../api/services/alimentoConsumoService';
import { criarStrData } from '../utils/utils';
import theme from '../styles/theme';
import DiarioNavigator from './DiarioNavigator';
import ChatbotScreen from '../screens/ChatbotScreen';
import LoadingScreen from '../components/LoadingScreen';
import CustomAlert from '../components/CustomAlert';

const Tab = createMaterialTopTabNavigator();

const AuthenticatedNavigator = ({navigation} : {navigation: any}) => {
   const insets = useSafeAreaInsets();

   const [
      { data: usuarioInfo, error: errorUsuario, isLoading: isLoadingUsuario },
      { data: perfisUsuario, error: errorPerfis, isLoading: isLoadingPerfis },
      { data: consumoUsuario, error: errorConsumo, isLoading: isLoadingConsumo },
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
            queryKey: ['consumoAlimentos'],
            queryFn: () => obterConsumoUsuarioService({dataInicio: criarStrData(-30), dataFim: criarStrData(30)}),
         },
         {
            queryKey: ['refeicoesUsuario'],
            queryFn: () => obterRefeicaoService(),
         }
      ]
   });

   if (isLoadingUsuario || isLoadingPerfis || isLoadingConsumo || isLoadingRefeicoes) {
      return <LoadingScreen loadingMessage='Carregando...' />;
   }

   if (errorUsuario || errorPerfis || errorConsumo || errorRefeicoes) {
      CustomAlert('Tente Novamente', 'Erro ao recuperar seus dados', () => navigation.replace('MainTab'), 'Tentar novamente');
      return <LoadingScreen loadingMessage='Erro ao carregar dados...' />;
   }

   return (
      <Tab.Navigator
         screenOptions={{
            tabBarStyle: { 
               backgroundColor: theme.colors.backgroundColor,
               paddingTop: insets.top,
            },
            tabBarIndicatorStyle: {
               backgroundColor: theme.colors.color05,
               height: 3,
             },
             tabBarLabelStyle: {
               color: theme.colors.color05, 
               fontSize: getResponsiveSizeHeight(1.9),
             },
         }}
      >
         <Tab.Screen name="Diário" component={DiarioNavigator} />
         <Tab.Screen name="ChatBot" component={ChatbotScreen} />
      </Tab.Navigator>
   );
};

export default AuthenticatedNavigator;