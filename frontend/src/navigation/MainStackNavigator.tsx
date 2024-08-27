import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UnauthenticatedNavigator from './UnauthenticatedNavigator';
import AuthenticatedNavigator from './AuthenticatedNavigator';
import LoadingScreen from '../components/LoadingScreen';
import { useAuthToken } from '../utils/useAuthToken';


const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
   const {token, removeToken} = useAuthToken()
   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(!!token);


   return (
      <NavigationContainer>
          {isAuthenticated ? (
            <AuthenticatedNavigator/>
         ) : (
            <UnauthenticatedNavigator setIsAuthenticated={setIsAuthenticated}/>
          )}
      </NavigationContainer>
    );
  };
  

export default MainStackNavigator;