import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UnauthenticatedNavigator from './UnauthenticatedNavigator';
import { useAuthToken } from '../utils/useAuthToken';
import TopTabNavigator from './TopTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/react-query';
import AuthenticatedNavigator from './AuthenticatedNavigator';

const MainStackNavigator = () => {
   const { token, removeToken } = useAuthToken()
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);


   return (
      <QueryClientProvider client={queryClient}>
         <SafeAreaProvider>
            <NavigationContainer>
               {token ? (
                  <AuthenticatedNavigator />
               ) : (
                  <UnauthenticatedNavigator setIsAuthenticated={setIsAuthenticated} />
               )}
            </NavigationContainer>
         </SafeAreaProvider>
      </QueryClientProvider>
   );
};


export default MainStackNavigator;