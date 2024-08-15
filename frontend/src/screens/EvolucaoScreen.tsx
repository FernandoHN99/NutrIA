import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EvolucaoScreen = () => {
   return (
      <View style={styles.container}>
         <Text>EvolucaoScreen</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'yellow',
   },
});

export default EvolucaoScreen;
