import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RefeicaoScreen from '../../screens/AuthenticadedScreens/HomeScreens/RefeicaoScreen';
import SearchFoodScreen from '../../screens/AuthenticadedScreens/HomeScreens/SearchFoodScreen';
import BottomTabNavigator from '../TabNavigators/BottomTabNavigator';
import AddConsumoScreen from '../../screens/AuthenticadedScreens/HomeScreens/AddConsumoScreen';

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
            name="SearchFoodScreen"
            component={SearchFoodScreen}
            options={{
               headerShown: false,
               animation: 'slide_from_bottom',
            }}
         />
         <Stack.Screen
            name="AddConsumoScreen"
            component={AddConsumoScreen}
            options={{
               headerShown: false,
               // animation: 'slide_from_bottom',
            }}
         />
      </Stack.Navigator>
   );
};

export default DiarioNavigator;