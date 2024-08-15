import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './navigation/MainStackNavigator';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const App = () => {
   const [loaded, error] = useFonts({
      'NotoSans-Regular': require('../assets/fonts/NotoSans-Regular.ttf'),
      'NotoSans-Bold': require('../assets/fonts/NotoSans-Bold.ttf'),
      'NotoSans-Italic': require('../assets/fonts/NotoSans-Italic.ttf'),
   });

   useEffect(() => {
      if (loaded || error) {
         SplashScreen.hideAsync();
      }
   }, [loaded, error]);

   if (!loaded && !error) {
      return null;
   }

   return (
         <MainStackNavigator/>
   )
}

export default App;