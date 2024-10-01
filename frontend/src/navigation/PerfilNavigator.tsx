import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutUsScreen from '../screens/AboutUsScreen';
import PerfilScreen from '../screens/PerfilScreen';
import theme from '../styles/theme';
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
      </Stack.Navigator>
   );
};

export default PerfilNavigator;
