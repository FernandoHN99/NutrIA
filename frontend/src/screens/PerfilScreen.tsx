import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PerfilScreen = () => {
   return (
      <View style={styles.container}>
         <Text>PerfilScreen</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
   },
});

export default PerfilScreen;