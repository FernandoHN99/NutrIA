import MainStackNavigator from './navigation/MainStackNavigator';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';

SplashScreen.preventAutoHideAsync();

const App = () => {
   const [loaded, error] = useFonts({
      'NotoSans-Regular': require('../assets/fonts/NotoSans-Regular.ttf'),
      'NotoSans-Bold': require('../assets/fonts/NotoSans-Bold.ttf'),
      'NotoSans-SemiBold': require('../assets/fonts/NotoSans-SemiBold.ttf'),
      'NotoSans-BoldItalic': require('../assets/fonts/NotoSans-BoldItalic.ttf'),
      'NotoSans-Italic': require('../assets/fonts/NotoSans-Italic.ttf'),
      'NotoSans-SemiBoldItalic': require('../assets/fonts/NotoSans-SemiBoldItalic.ttf'),

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
      <QueryClientProvider client={queryClient}>
         <MainStackNavigator />
      </QueryClientProvider>

   )
}

export default App;