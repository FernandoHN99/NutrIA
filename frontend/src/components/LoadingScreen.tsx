import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import theme from '../styles/theme';

const LoadingScreen = ({loadingMessage} :{loadingMessage: string}) => {

   return (
      <View style={styles.container}>
         <ActivityIndicator size="large" color={theme.colors.color05} />
         <Text style={styles.text}>{loadingMessage}</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.backgroundColor
   },
   text: {
      marginTop: 20,
      fontSize: 16,
      color: '#333',
   },
});

export default LoadingScreen;
