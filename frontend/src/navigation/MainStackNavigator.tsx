import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UnauthenticatedNavigator from './UnauthenticatedNavigator';
import AuthenticatedNavigator from './AuthenticatedNavigator';
import LoadingScreen from '../components/LoadingScreen';
import { useAuthToken } from '../utils/useAuthToken';
import TopTabNavigator from './TopTabNavigator';

import {
   SafeAreaProvider,
   useSafeAreaInsets,
} from 'react-native-safe-area-context';


const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
   const { token, removeToken } = useAuthToken()
   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(true);


   return (
      <SafeAreaProvider>
         <NavigationContainer>
            {isAuthenticated ? (
               // <AuthenticatedNavigator/>
               <TopTabNavigator />
            ) : (
               <UnauthenticatedNavigator setIsAuthenticated={setIsAuthenticated} />
            )}
         </NavigationContainer>
      </SafeAreaProvider>
   );
};


export default MainStackNavigator;