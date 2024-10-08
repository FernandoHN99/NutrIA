import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BoasVindasScreen from '../../screens/UnauthenticadedScreens/BoasVindasScreen';
import LoginScreen from '../../screens/UnauthenticadedScreens/LoginScreen';
import theme from '../../styles/theme';
import SignUpScreen from '../../screens/UnauthenticadedScreens/SignUpScreen';

const Stack = createNativeStackNavigator();

const UnauthenticatedNavigator = () => {


   return (
      <Stack.Navigator initialRouteName='Boas-Vindas' screenOptions={styles.headerNavigator}>
         <Stack.Screen
            name="Boas-Vindas"
            component={BoasVindasScreen}
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={styles.screenOptionLogin}
            // initialParams={{ setIsAuthenticated }}
         />
         <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={styles.screenOptionSignUp}
            // initialParams={{ setIsAuthenticated }}
         />
      </Stack.Navigator>
   );
};



const styles = {
   headerNavigator: {
      headerTitleAlign: 'center' as const,
   },
   screenOptionLogin: {
      title: '',
      headerTintColor: theme.colors.color05,
      headerBackTitleVisible: false,
      headerTransparent: true,
   },
   screenOptionSignUp: {
      title: 'NutrIA',
      headerTintColor: theme.colors.color05,
      headerBackTitleVisible: false,
      // headerShadowVisible: false,
      headerStyle: {
         backgroundColor: theme.colors.backgroundColor,
      },
   }
};


export default UnauthenticatedNavigator;
