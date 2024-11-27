import React from 'react';
import HomeScreen from '../../screens/AuthenticadedScreens/HomeScreens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchFoodScreen from '../../screens/AuthenticadedScreens/HomeScreens/SearchFoodScreen';
import RefeicaoScreen from '../../screens/AuthenticadedScreens/HomeScreens/RefeicaoScreen';
import AddConsumoScreen from '../../screens/AuthenticadedScreens/HomeScreens/AddConsumoScreen';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {

   return (
      <Stack.Navigator>
         <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
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
            name="RefeicaoScreen"
            component={RefeicaoScreen}
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

export default HomeNavigator;
