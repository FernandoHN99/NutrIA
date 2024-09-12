import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import EvolucaoScreen from '../screens/EvolucaoScreen';
import PerfilScreen from '../screens/PerfilScreen';
import theme from '../styles/theme';
import HomeNavigator from './HomeNavigator';
const Tab = createBottomTabNavigator();

const DiarioNavigator = () => {
   return (
      <Tab.Navigator initialRouteName='Home' screenOptions={{ 
         headerShown: false,  
         tabBarStyle: { 
            backgroundColor: theme.colors.backgroundColor 
            } 
         }}
      >
         <Tab.Screen name="Home" component={HomeNavigator} />
         <Tab.Screen name="Evolução" component={EvolucaoScreen} />
         <Tab.Screen name="Perfil" component={PerfilScreen} />
      </Tab.Navigator>
   );
};

export default DiarioNavigator;
