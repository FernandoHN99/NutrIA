import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import UnauthenticatedNavigator from './UnauthenticatedNavigator';
import AuthenticatedNavigator from './AuthenticatedNavigator';

const MainStackNavigator = () => {
   const [usuario, setUsuario] = useState<boolean>(false);

   return (
      <NavigationContainer>
         {usuario ? (
            <AuthenticatedNavigator />
         ) : (
            <UnauthenticatedNavigator />
         )}
      </NavigationContainer>
   );
};

export default MainStackNavigator;
