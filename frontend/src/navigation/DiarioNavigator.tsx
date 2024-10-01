import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EvolucaoScreen from '../screens/EvolucaoScreen';
import PerfilNavigator from './PerfilNavigator';
import theme from '../styles/theme';
import HomeNavigator from './HomeNavigator';
import RefeicaoScreen from '../screens/RefeicaoScreen';
import AddConsumoScreen from '../screens/AddConsumoScreen';
import Icon from '@expo/vector-icons/Ionicons';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTabs = () => {
   return (
      <Tab.Navigator
         initialRouteName='Home'
         screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
               backgroundColor: theme.colors.backgroundColor,
               paddingBottom: 25,
               height: 70,
            },
            tabBarIcon: ({ focused, color, size }) => {
               let iconName:
                  'home' |
                  'home-outline' |
                  'stats-chart' |
                  'stats-chart-outline' |
                  'person' |
                  'person-outline' = 'home';

               if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
               } else if (route.name === 'Evolução') {
                  iconName = focused ? 'stats-chart' : 'stats-chart-outline';
               } else if (route.name === 'Perfil') {
                  iconName = focused ? 'person' : 'person-outline';
               }

               return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme.colors.color05,
            tabBarInactiveTintColor: theme.colors.color05,
         })}
      >
         <Tab.Screen name="Home" component={HomeNavigator} />
         <Tab.Screen name="Evolução" component={EvolucaoScreen} />
         <Tab.Screen name="Perfil" component={PerfilNavigator} />
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
         <Stack.Screen
            name="AddAlimentoScreen"
            component={AddConsumoScreen}
            options={{
               headerShown: false,
               animation: 'slide_from_bottom',
            }}
         />
      </Stack.Navigator>
   );
};

export default DiarioNavigator;