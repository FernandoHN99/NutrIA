import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EvolucaoScreen from '../../screens/AuthenticadedScreens/EvolucaoScreens/EvolucaoScreen';
import PerfilNavigator from '../BottomNavigators/PerfilNavigator';
import theme from '../../styles/theme';
import HomeNavigator from '../BottomNavigators/HomeNavigator';
import Icon from '@expo/vector-icons/Ionicons';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
   return (
      <Tab.Navigator
         initialRouteName='Home'
         screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
               backgroundColor: theme.colors.backgroundColor,
               paddingTop: 10,
               paddingBottom: 13,
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

export default BottomTabNavigator;