import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import EvolucaoScreen from '../screens/EvolucaoScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Tab = createBottomTabNavigator();

const DiarioNavigator = () => {
   return (
      <Tab.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
         <Tab.Screen name="Home" component={HomeScreen} />
         <Tab.Screen name="Evolução" component={EvolucaoScreen} />
         <Tab.Screen name="Perfil" component={PerfilScreen} />
         {/* // Adicionar todas as telas restantes aqui */}
      </Tab.Navigator>
   );
};

export default DiarioNavigator;