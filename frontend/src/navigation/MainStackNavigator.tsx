import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UnauthenticatedNavigator from './UnauthenticatedNavigator';
import { useAuthToken } from '../utils/useAuthToken';
import AuthenticatedNavigator from './AuthenticatedNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/react-query';

const MainStackNavigator = () => {
   const { token, removeTokens } = useAuthToken()
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);

   return (
      <QueryClientProvider client={queryClient}>
         <SafeAreaProvider>
            <NavigationContainer>
               {isAuthenticated ? (
                  <AuthenticatedNavigator/>
               ) : (
                  <UnauthenticatedNavigator setIsAuthenticated={setIsAuthenticated} />
               )}
            </NavigationContainer>
         </SafeAreaProvider>
      </QueryClientProvider>
   );
};


export default MainStackNavigator;