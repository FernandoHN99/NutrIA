import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EvolucaoScreen from '../screens/EvolucaoScreen';
import PerfilScreen from '../screens/PerfilScreen';
import theme from '../styles/theme';
import HomeNavigator from './HomeNavigator';
import RefeicaoScreen from '../screens/RefeicaoScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs = () => {
   return (
      <Tab.Navigator
         initialRouteName='Home'
         screenOptions={{
            headerShown: false,
            tabBarStyle: {
               backgroundColor: theme.colors.backgroundColor,
            },
         }}
      >
         <Tab.Screen name="Home" component={HomeNavigator} />
         <Tab.Screen name="Evolução" component={EvolucaoScreen} />
         <Tab.Screen name="Perfil" component={PerfilScreen} />
      </Tab.Navigator>
   );
};

const DiarioNavigator = () => {
   return (
      <Stack.Navigator>
         <Stack.Screen
            name="BottomTabs"
            component={BottomTabs}
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="RefeicaoScreen"
            component={RefeicaoScreen}
            options={{
               headerShown: false,
               animation: 'slide_from_bottom',
            }}
         />
      </Stack.Navigator>
   );
};

export default DiarioNavigator;