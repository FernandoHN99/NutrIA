import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RefeicaoScreen from '../screens/RefeicaoScreen';
import theme from '../styles/theme';
import { getResponsiveSizeWidth } from '../utils/utils';
const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
   return (
      <Stack.Navigator initialRouteName='TelaInicial'>
         <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
         />
         <Stack.Screen
            name="RefeicaoScreen"
            component={RefeicaoScreen}
            options={({ route }: { route: any }) => ({
               title: '',
               headerShown: false,
               headerBackTitleVisible: false,
               headerShadowVisible: false,
               headerTintColor: theme.colors.color05,
               animation: 'slide_from_right',
               headerBackButtonMenuEnabled: false,
               headerStyle: {
                  backgroundColor: theme.colors.backgroundColor,
               },
               headerTitleStyle: {
                  fontFamily: 'NotoSans-Bold',
                  fontSize: getResponsiveSizeWidth(6),
               },
            })}
         />
      </Stack.Navigator>
   );
};

const styles = {

   screenRefeicaoLogin: {

      backgroundColor: theme.colors.color05,
      // headerBackTitleVisible: false,
      // headerTransparent: true,
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
export default HomeNavigator;
