import React from 'react';
import HomeScreen from '../../screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {

   return (
      <Stack.Navigator>
         <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
         />
      </Stack.Navigator>
   );
};

export default HomeNavigator;
