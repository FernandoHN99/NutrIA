import React from 'react';
import HomeScreen from '../../screens/AuthenticadedScreens/HomeScreens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutUsScreen from '../../screens/AuthenticadedScreens/PerfilScreens/AboutUsScreen';
import PerfilScreen from '../../screens/AuthenticadedScreens/PerfilScreens/PerfilScreen';
import PoliticaPrivacidadeScreen from '../../screens/AuthenticadedScreens/PerfilScreens/PoliticaPrivacidadeScreen';
import UserRefeicoesScreen from '../../screens/AuthenticadedScreens/PerfilScreens/UserRefeicoesScreen';
import DadosPerfilScreen from '../../screens/AuthenticadedScreens/PerfilScreens/DadosPerfilScreen';

const Stack = createNativeStackNavigator();

const PerfilNavigator = () => {

   return (
      <Stack.Navigator initialRouteName='PerfilScreen'>
         <Stack.Screen
            name="PerfilScreen"
            component={PerfilScreen}
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="AboutUsScreen"
            component={AboutUsScreen}
            options={{ 
               headerShown: false,
               animation: 'slide_from_right',
            }}
         />
         <Stack.Screen
            name="PoliticaPrivacidadeScreen"
            component={PoliticaPrivacidadeScreen}
            options={{ 
               headerShown: false,
               animation: 'slide_from_right',
            }}
         />
          <Stack.Screen
            name="UserRefeicoesScreen"
            component={UserRefeicoesScreen}
            options={{ 
               headerShown: false,
               animation: 'slide_from_right',
            }}
         />
         <Stack.Screen
            name="DadosPerfilScreen"
            component={DadosPerfilScreen}
            options={{ 
               headerShown: false,
               animation: 'slide_from_right',
            }}
         />
      </Stack.Navigator>
   );
};

export default PerfilNavigator;
