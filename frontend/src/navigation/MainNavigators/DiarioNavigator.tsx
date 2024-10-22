import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from '../TabNavigators/BottomTabNavigator';
import AccessCamera from '../../components/AccessCamera';

const Stack = createNativeStackNavigator();

const DiarioNavigator = () => {
   return (
      <Stack.Navigator>
         <Stack.Screen
            name="BottomTabs"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
         />
         {/* <Stack.Screen
            name="CameraScreen"
            component={AccessCamera}
            options={{
               headerShown: false,
               animation: 'flip',
            }}
         /> */}
         {/* <Stack.Screen
            name="SearchFoodScreen"
            component={SearchFoodScreen}
            options={{
               headerShown: false,
               animation: 'slide_from_bottom',
            }}
         /> */}
         {/* <Stack.Screen
            name="AddConsumoScreen"
            component={AddConsumoScreen}
            options={{
               headerShown: false,
               // animation: 'slide_from_bottom',
            }}
         /> */}
      </Stack.Navigator>
   );
};

export default DiarioNavigator;