import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RefeicaoScreen from '../../screens/AuthenticadedScreens/HomeScreens/RefeicaoScreen';
import AddConsumoScreen from '../../screens/AuthenticadedScreens/HomeScreens/AddConsumoScreen';
import BottomTabNavigator from '../TabNavigators/BottomTabNavigator';

const Stack = createNativeStackNavigator();

const DiarioNavigator = () => {
   return (
      <Stack.Navigator>
         <Stack.Screen
            name="BottomTabs"
            component={BottomTabNavigator}
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