import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BoasVindasScreen from '../screens/BoasVindasScreen';
import LoginScreen from '../screens/LoginScreen';
import theme from '../styles/theme';
import SignUpScreen from '../screens/SignUpScreen';
const Stack = createNativeStackNavigator();

const UnauthenticatedNavigator = () => {
   return (
      <Stack.Navigator initialRouteName='Boas-Vindas' screenOptions={styles.headerNavigator}>
         <Stack.Screen
            name="Boas-Vindas"
            component={BoasVindasScreen}
            options={{ title: 'Boas-Vindas', headerShown: false }}
         />
         <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={styles.screenOptionLogin}
         />
         <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={styles.screenOptionSignUp}
         />
      </Stack.Navigator>
   );
};

const styles = {
   headerNavigator: {
      headerStyle: {
         backgroundColor: theme.colors.color01,
      },
      headerTitleAlign: 'center' as const
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
      // headerTransparent: true,
   }
};


export default UnauthenticatedNavigator;
