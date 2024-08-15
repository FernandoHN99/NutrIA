import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import TopTabNavigator from './TopTabNavigator';
import LogoIcon from '../components/LogoIcon';
import globalStyles from '../styles/globalStyles';
import theme from '../styles/theme';

const Stack = createNativeStackNavigator();

const AuthenticatedNavigator = () => {
   return (
      <Stack.Navigator>
         <Stack.Screen
            name="MainTab"
            component={TopTabNavigator}
            options={{
               headerStyle: {
                  backgroundColor: theme.colors.color01,
               },
               headerTitle: () => (
                  <React.Fragment>
                     <LogoIcon widthPorcentageValue={10} />
                     <Text style={globalStyles.heading}>NutrIA</Text>
                  </React.Fragment>
               ),
               headerTitleAlign: 'center',
            }}
         />
      </Stack.Navigator>
   );
};

export default AuthenticatedNavigator;
