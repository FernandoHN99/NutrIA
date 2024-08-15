import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DiarioNavigator from './DiarioNavigator';
import ChatbotScreen from '../screens/ChatbotScreen';
import theme from '../styles/theme';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
   return (
      <Tab.Navigator
      screenOptions={{
         tabBarStyle: { backgroundColor: theme.colors.color01 },
      }}>
         <Tab.Screen name="Diário" component={DiarioNavigator}/>
         <Tab.Screen name="ChatBot" component={ChatbotScreen} />
      </Tab.Navigator>
   );
};

export default TopTabNavigator;
