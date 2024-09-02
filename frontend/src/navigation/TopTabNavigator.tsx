import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DiarioNavigator from './DiarioNavigator';
import ChatbotScreen from '../screens/ChatbotScreen';
import theme from '../styles/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
   const insets = useSafeAreaInsets();

   return (
      <Tab.Navigator
         screenOptions={{
            tabBarStyle: { 
               backgroundColor: theme.colors.backgroundColor,
               paddingTop: insets.top,
            },
         }}
      >
         <Tab.Screen name="Diário" component={DiarioNavigator} />
         <Tab.Screen name="ChatBot" component={ChatbotScreen} />
      </Tab.Navigator>
   );
};

export default TopTabNavigator;