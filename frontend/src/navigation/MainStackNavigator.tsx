import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UnauthenticatedNavigator from './AuthenticationNavigators/UnauthenticatedNavigator';
import AuthenticatedNavigator from './AuthenticationNavigators/AuthenticatedNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getUserTokens } from '../api/httpState/usuarioAuth';

const MainStackNavigator = () => {
   const isAuthenticated = getUserTokens()?.token ? true : false;
   
   return (
         <SafeAreaProvider>
            <NavigationContainer>
               {isAuthenticated ? (
                  <AuthenticatedNavigator  />
               ) : (
                  <UnauthenticatedNavigator  />
               )}
            </NavigationContainer>
         </SafeAreaProvider>
   );
};


export default MainStackNavigator;