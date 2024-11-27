import React from 'react';
import HomeScreen from '../../screens/AuthenticadedScreens/HomeScreens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutUsScreen from '../../screens/AuthenticadedScreens/SettingsScreens/AboutUsScreen';
import SettingsScreen from '../../screens/AuthenticadedScreens/SettingsScreens/SettingsScreen';
import PoliticaPrivacidadeScreen from '../../screens/AuthenticadedScreens/SettingsScreens/PoliticaPrivacidadeScreen';
import RefeicoesScreen from '../../screens/AuthenticadedScreens/SettingsScreens/RefeicoesScreen';
import DadosPerfilScreen from '../../screens/AuthenticadedScreens/SettingsScreens/DadosPerfilScreen';

const Stack = createNativeStackNavigator();

const SettingsNavigator = () => {

   return (
      <Stack.Navigator initialRouteName='SettingsScreen'>
         <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
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
            name="RefeicoesScreen"
            component={RefeicoesScreen}
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

export default SettingsNavigator;
