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

   if (isAuthenticated == null) {
      return <LoadingScreen loadingMessage='Criando a sua conta...'/>
   }

   return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isAuthenticated ? (
            <Stack.Screen 
               name="Auth" 
               component={AuthenticatedNavigator} />
           ) : (
              <Stack.Screen 
                  name="Unauth" 
                  component={UnauthenticatedNavigator} 
                  initialParams={{ setIsAuthenticated }} 
               />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  

export default MainStackNavigator;